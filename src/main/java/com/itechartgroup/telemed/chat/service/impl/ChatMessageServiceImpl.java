package com.itechartgroup.telemed.chat.service.impl;

import com.itechartgroup.telemed.chat.config.ChatProperties;
import com.itechartgroup.telemed.chat.dto.ChatMessageDto;
import com.itechartgroup.telemed.chat.dto.ChatRoomDto;
import com.itechartgroup.telemed.chat.dto.ChatThreadHolder;
import com.itechartgroup.telemed.chat.entity.ChatMessage;
import com.itechartgroup.telemed.chat.repository.ChatMessageRepository;
import com.itechartgroup.telemed.chat.service.ChatMessageService;
import com.itechartgroup.telemed.chat.service.ChatRoomService;
import com.itechartgroup.telemed.chat.service.mapper.ChatMessageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.itechartgroup.telemed.utils.DateTimeUtils.convertToDateTime;

/**
 * @author s.vareyko
 * @since 07.04.2020
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final Map<Long, ChatThreadHolder> SUBSCRIBERS = new ConcurrentHashMap<>();

    private final ChatMessageRepository repository;
    private final ChatMessageMapper mapper;
    private final ChatProperties properties;
    private final ChatRoomService chatRoomService;

    @Override
    public ChatMessageDto send(final ChatMessageDto dto) {
        final ChatMessage message = mapper.map(dto);
        final ChatMessageDto saved = mapper.map(repository.save(message));
        final ChatRoomDto room = chatRoomService.updateRoomAndGet(saved);
        holdResultForShortTerm(room, saved);
        return saved;
    }

    @Override
    public Page<ChatMessageDto> load(final UUID roomId, final Pageable page) {
        // todo: secure this endpoint (for now its possible to provide any room id and get data from it)
        //  best way to do this its aspects, but it will add some limitations, so need to discuss when development
        //  will be confirmed
        return repository.findAllByRoomOrderByCreatedDesc(roomId, page).map(mapper::map);
    }

    @Override
    public SortedSet<ChatRoomDto> poll(final long timestamp, final long userId) {
        final ChatThreadHolder container = SUBSCRIBERS.computeIfAbsent(userId, id -> new ChatThreadHolder(userId));

        final LocalDateTime lastUpdate = convertToDateTime(timestamp);
        final SortedSet<ChatRoomDto> currentUpdates = container.getResult(lastUpdate);
        if (!currentUpdates.isEmpty()) {
            return currentUpdates;
        }

        container.add(Thread.currentThread());

        try {
            TimeUnit.MILLISECONDS.sleep(properties.getPollingTimeout());
        } catch (InterruptedException ignore) {
            return container.getResult(lastUpdate);
        } finally {
            container.removeThread(Thread.currentThread(), () -> SUBSCRIBERS.remove(userId));
        }

        return null;
    }

    /**
     * Special method, which prevent removing of result and holds for cases when its can be
     * removed between requests and some other delays.
     *
     * @param room    latest version of the room
     * @param message that should be stored for a short term
     */
    private void holdResultForShortTerm(final ChatRoomDto room, final ChatMessageDto message) {
        new Thread(() -> {
            log.debug("Holder start: {}", System.currentTimeMillis());

            final long end = System.currentTimeMillis() + properties.getHoldTimeout() + 600000;

            room.getMessages().add(message);
            final List<ChatThreadHolder> holders = room.getParticipants().parallelStream()
                    .map(part -> SUBSCRIBERS.computeIfAbsent(part.getUserId(), ChatThreadHolder::new))
                    .collect(Collectors.toList());
            holders.forEach(holder -> holder.replaceRoom(Thread.currentThread(), room));

            do {
                try {
                    TimeUnit.MILLISECONDS.sleep(properties.getHoldTimeout() / 10);
                } catch (final InterruptedException ignore) {
                }
            } while (System.currentTimeMillis() < end);

            holders.forEach(holder -> holder.removeThread(message, Thread.currentThread(),
                    () -> SUBSCRIBERS.remove(holder.getUserId())));

            log.debug("Holder end: {}", System.currentTimeMillis());
        }).start();
    }
}

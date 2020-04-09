package com.itechartgroup.telemedpoc.chat.service.impl;

import com.itechartgroup.telemedpoc.chat.dto.ChatMessageDto;
import com.itechartgroup.telemedpoc.chat.dto.ChatMessageSource;
import com.itechartgroup.telemedpoc.chat.dto.ChatRoomDto;
import com.itechartgroup.telemedpoc.chat.dto.ChatThreadHolder;
import com.itechartgroup.telemedpoc.chat.entity.ChatMessage;
import com.itechartgroup.telemedpoc.chat.repository.ChatMessageRepository;
import com.itechartgroup.telemedpoc.chat.service.ChatMessageService;
import com.itechartgroup.telemedpoc.chat.service.ChatRoomService;
import com.itechartgroup.telemedpoc.chat.service.mapper.ChatMessageMapper;
import com.itechartgroup.telemedpoc.chat.utils.UserDetailsUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;
import java.util.SortedSet;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

import static com.itechartgroup.telemedpoc.chat.constant.ChatConstants.HOLD_TIMEOUT;
import static com.itechartgroup.telemedpoc.chat.constant.ChatConstants.POLLING_TIMEOUT;
import static com.itechartgroup.telemedpoc.chat.utils.DateTimeUtils.convertToDateTime;

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
    private final ChatRoomService chatRoomService;

    @Override
    public ChatMessageDto send(final ChatMessageDto dto) {
        final ChatMessage message = mapper.map(dto);
        final ChatMessageDto saved = mapper.map(repository.save(message));
        final boolean isIncrement = saved.getSource() == ChatMessageSource.USER;
        final ChatRoomDto room = chatRoomService.updateRoomAndGet(saved.getRoom(), isIncrement);
        holdResultForShortTerm(saved, room);
        return saved;
    }

    @Override
    public Page<ChatMessageDto> load(final UUID dialogId, final Pageable page) {
        return repository.findAllByRoomOrderByCreatedDesc(dialogId, page).map(mapper::map);
    }

    @Override
    public SortedSet<ChatMessageDto> poll(final long timestamp) {
        final Long userId = UserDetailsUtils.currentUserId();
        if (Objects.isNull(userId)) {
            return null;
        }
        final ChatThreadHolder container = SUBSCRIBERS.computeIfAbsent(userId, id -> new ChatThreadHolder(userId));

        final LocalDateTime lastUpdate = convertToDateTime(timestamp);
        final SortedSet<ChatMessageDto> currentUpdates = container.getResult(lastUpdate);
        if (!currentUpdates.isEmpty()) {
            return currentUpdates;
        }

        container.add(Thread.currentThread());

        try {
            Thread.sleep(POLLING_TIMEOUT);
        } catch (InterruptedException ignore) {
            return container.getResult(lastUpdate);
        } finally {
            container.removeThread(Thread.currentThread(), () -> SUBSCRIBERS.remove(userId));
        }

        return null;
    }

    /**
     * Special method, which prevent removing of result and holds for cases when its can be removed between requests and some other delays
     */
    private void holdResultForShortTerm(final ChatMessageDto msg, final ChatRoomDto room) {
        new Thread(() -> {
            log.debug("Holder start: {}", System.currentTimeMillis());

            final long end = System.currentTimeMillis() + HOLD_TIMEOUT;

            final Stream<ChatThreadHolder> holders = room.getParticipants().parallelStream()
                    .map(uid -> SUBSCRIBERS.computeIfAbsent(uid, id -> new ChatThreadHolder(uid)));
            holders.forEach(holder -> holder.add(Thread.currentThread(), msg));

            do {
                try {
                    Thread.sleep(HOLD_TIMEOUT);
                } catch (final InterruptedException ignore) {
                }
            } while (System.currentTimeMillis() < end);

            holders.forEach(holder -> holder.removeThread(Thread.currentThread(),
                    () -> SUBSCRIBERS.remove(holder.getUserId())));

            log.debug("Holder end: {}", System.currentTimeMillis());
        }).start();
    }
}

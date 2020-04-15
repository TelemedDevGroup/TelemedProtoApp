package com.itechartgroup.telemed.chat.service.impl;

import com.itechartgroup.telemed.chat.dto.ChatMessageDto;
import com.itechartgroup.telemed.chat.dto.ChatMessageSource;
import com.itechartgroup.telemed.chat.dto.ChatRoomDto;
import com.itechartgroup.telemed.chat.dto.ChatRoomParticipantDto;
import com.itechartgroup.telemed.chat.entity.ChatRoom;
import com.itechartgroup.telemed.chat.entity.ChatRoomParticipant;
import com.itechartgroup.telemed.chat.exception.ChatRoomNotFoundException;
import com.itechartgroup.telemed.chat.repository.ChatRoomParticipantRepository;
import com.itechartgroup.telemed.chat.repository.ChatRoomRepository;
import com.itechartgroup.telemed.chat.service.ChatRoomService;
import com.itechartgroup.telemed.chat.service.mapper.ChatRoomMapper;
import com.itechartgroup.telemed.chat.service.mapper.ChatRoomParticipantMapper;
import com.itechartgroup.telemed.security.repository.UserRepository;
import com.itechartgroup.telemed.security.repository.projection.UserNameAndIdProjection;
import lombok.AllArgsConstructor;
import lombok.Synchronized;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import static com.itechartgroup.telemed.chat.constant.ChatConstants.UNREAD_INC_SIZE;
import static com.itechartgroup.telemed.chat.constant.ChatConstants.UNREAD_NO_MESSAGES;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Service
@AllArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository repository;
    private final ChatRoomMapper mapper;
    private final ChatRoomParticipantRepository participantRepository;
    private final ChatRoomParticipantMapper participantMapper;
    private final UserRepository userRepository;

    @Override
    public ChatRoomDto create(final Set<Long> participants) {
        final ChatRoom room = new ChatRoom();
        final LocalDateTime now = LocalDateTime.now();
        room.setCreated(now);
        room.setUpdated(now);
        final ChatRoom saved = repository.save(room);
        final Set<ChatRoomParticipant> roommates = participantMapper.createEntities(participants, saved.getId());
        participantRepository.saveAll(roommates);
        room.setParticipants(roommates);
        return mapper.map(saved);
    }

    @Override
    public Page<ChatRoomDto> load(final Pageable pageable, final Long userId) {
        return insertParticipantNames(repository.findByParticipants_UserIdEquals(userId, pageable).map(mapper::map));
    }

    @Override
    @Synchronized
    public ChatRoomDto updateRoomAndGet(final ChatMessageDto message) {
        return findAndApply(message.getRoom(), room -> {
            room.setUpdated(LocalDateTime.now());
            incrementMessageCount(room, message);
            incrementUnreadCount(room, message);
        });
    }

    @Override
    public ChatRoomDto markAsRead(final Long userId, final UUID roomId) {
        return findAndApply(roomId, room -> room.getParticipants().stream()
                .filter(part -> part.getUserId().equals(userId)).findAny()
                .ifPresent(part -> part.setUnreadCount(UNREAD_NO_MESSAGES)));
    }

    /**
     * Helper method, which made all checks, provide a time
     */
    private ChatRoomDto findAndApply(final UUID roomId, final Consumer<ChatRoom> action) {
        final Optional<ChatRoom> optional = repository.findById(roomId);
        if (optional.isPresent()) {
            final ChatRoom room = optional.get();
            action.accept(room);
            return mapper.map(repository.save(room));
        }
        throw new ChatRoomNotFoundException();
    }

    /**
     * Special method with custom logic for handling counter of messages.
     *
     * @param room    entity for update
     * @param message current message info
     */
    private void incrementMessageCount(final ChatRoom room, final ChatMessageDto message) {
        if (message.getSource() == ChatMessageSource.USER) {
            room.setMessageCount(room.getMessageCount() + UNREAD_INC_SIZE);
        }
    }

    /**
     * Special method with custom logic for handling unread messages counter.
     *
     * @param room    entity for update
     * @param message current message info
     */
    private void incrementUnreadCount(final ChatRoom room, final ChatMessageDto message) {
        room.getParticipants().forEach(participant -> {
            if (Objects.equals(message.getAuthor(), participant.getUserId())) {
                participant.setUnreadCount(UNREAD_NO_MESSAGES);
            } else {
                participant.setUnreadCount(participant.getUnreadCount() + UNREAD_INC_SIZE);
            }
        });
    }

    /**
     * Method that collects all participant ids and retrieve names for each of them.
     *
     * @param rooms for which will be retrieved usernames
     * @return original object with inserted usernames
     */
    private Page<ChatRoomDto> insertParticipantNames(final Page<ChatRoomDto> rooms) {
        final List<ChatRoomParticipantDto> entries = rooms.getContent().stream()
                .map(ChatRoomDto::getParticipants).flatMap(Collection::stream).collect(Collectors.toList());
        final Set<Long> userIds = entries.stream().map(ChatRoomParticipantDto::getUserId).collect(Collectors.toSet());
        final Map<Long, String> usernames = userRepository.findAllByIdIn(userIds).stream()
                .collect(Collectors.toMap(UserNameAndIdProjection::getId, UserNameAndIdProjection::getName));
        entries.forEach(participant -> participant.setUsername(usernames.get(participant.getUserId())));
        return rooms;
    }
}

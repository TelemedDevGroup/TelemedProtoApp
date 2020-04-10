package com.itechartgroup.telemedpoc.chat.service.impl;

import com.itechartgroup.telemedpoc.chat.dto.ChatRoomDto;
import com.itechartgroup.telemedpoc.chat.entity.ChatRoom;
import com.itechartgroup.telemedpoc.chat.exception.ChatRoomNotFoundException;
import com.itechartgroup.telemedpoc.chat.repository.ChatRoomRepository;
import com.itechartgroup.telemedpoc.chat.service.ChatRoomService;
import com.itechartgroup.telemedpoc.chat.service.mapper.ChatRoomMapper;
import lombok.AllArgsConstructor;
import lombok.Synchronized;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Service
@AllArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository repository;
    private final ChatRoomMapper mapper;

    @Override
    public ChatRoomDto create(final Set<Long> participants) {
        final ChatRoom room = new ChatRoom();
        room.setParticipants(participants);
        final LocalDateTime now = LocalDateTime.now();
        room.setCreated(now);
        room.setUpdated(now);
        return mapper.map(repository.save(room));
    }

    @Override
    public Page<ChatRoomDto> load(final Pageable page, final Long userId) {
        return repository.findAllByParticipantsContainsOrderByUpdatedDesc(userId, page).map(mapper::map);
    }

    @Override
    @Synchronized
    public ChatRoomDto updateRoomAndGet(final UUID id, final boolean increment) {
        final Optional<ChatRoom> optional = repository.findById(id);
        if (optional.isPresent()) {
            final ChatRoom room = optional.get();
            room.setUpdated(LocalDateTime.now());
            room.setMessageCount(room.getMessageCount() + 1);
            return mapper.map(repository.save(room));
        }
        throw new ChatRoomNotFoundException();
    }
}

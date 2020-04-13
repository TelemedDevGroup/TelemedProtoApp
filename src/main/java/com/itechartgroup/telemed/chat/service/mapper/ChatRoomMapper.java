package com.itechartgroup.telemed.chat.service.mapper;

import com.itechartgroup.telemed.chat.dto.ChatRoomDto;
import com.itechartgroup.telemed.chat.entity.ChatRoom;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Component
public class ChatRoomMapper {

    public ChatRoom map(final ChatRoomDto dto) {
        final ChatRoom message = new ChatRoom();
        map(dto, message);
        return message;
    }

    public void map(final ChatRoomDto from, final ChatRoom to) {
        final LocalDateTime now = LocalDateTime.now();
        if (Objects.isNull(to.getId())) {
            to.setId(UUID.randomUUID());
            to.setCreated(now);
            to.setParticipants(from.getParticipants());
        }
        to.setId(from.getId());
        to.setUpdated(from.getUpdated());
        to.setMessageCount(from.getMessageCount());
    }

    public ChatRoomDto map(final ChatRoom message) {
        final ChatRoomDto dto = new ChatRoomDto();
        map(message, dto);
        return dto;
    }

    public void map(final ChatRoom from, final ChatRoomDto to) {
        final LocalDateTime now = LocalDateTime.now();
        to.setId(from.getId());
        to.setCreated(now);
        to.setUpdated(from.getUpdated());
        to.setId(from.getId());
        to.setMessageCount(from.getMessageCount());
        to.setParticipants(from.getParticipants());
    }
}

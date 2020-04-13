package com.itechartgroup.telemed.chat.service.mapper;

import com.itechartgroup.telemed.chat.dto.ChatMessageDto;
import com.itechartgroup.telemed.chat.entity.ChatMessage;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Component
public class ChatMessageMapper {

    public ChatMessage map(final ChatMessageDto dto) {
        final ChatMessage message = new ChatMessage();
        map(dto, message);
        return message;
    }

    public void map(final ChatMessageDto from, final ChatMessage to) {
        final LocalDateTime now = LocalDateTime.now();
        if (Objects.isNull(to.getId())) {
            to.setCreated(now);
        }
        to.setId(from.getId());
        to.setRoom(from.getRoom());
        to.setBody(from.getBody());
        to.setType(from.getType());
        to.setSource(from.getSource());
        to.setAuthor(from.getAuthor());
        to.setUpdated(now);
    }

    public ChatMessageDto map(final ChatMessage message) {
        final ChatMessageDto dto = new ChatMessageDto();
        map(message, dto);
        return dto;
    }

    public void map(final ChatMessage from, final ChatMessageDto to) {
        to.setId(from.getId());
        to.setRoom(from.getRoom());
        to.setCreated(from.getCreated());
        to.setUpdated(from.getUpdated());
        to.setId(from.getId());
        to.setBody(from.getBody());
        to.setType(from.getType());
        to.setSource(from.getSource());
        to.setAuthor(from.getAuthor());
    }
}

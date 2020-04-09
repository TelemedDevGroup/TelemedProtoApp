package com.itechartgroup.telemedpoc.chat.service.mapper;

import com.itechartgroup.telemedpoc.chat.dto.ChatMessageDto;
import com.itechartgroup.telemedpoc.chat.entity.ChatMessage;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

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
            to.setId(UUID.randomUUID());
            to.setCreated(now);
        }
        to.setId(from.getId());
        to.setBody(from.getBody());
        to.setType(from.getType());
        to.setSource(from.getSource());
        to.setAuthor(from.getAuthor());
        to.setUpdated(from.getUpdated());
    }

    public ChatMessageDto map(final ChatMessage message) {
        final ChatMessageDto dto = new ChatMessageDto();
        map(message, dto);
        return dto;
    }

    public void map(final ChatMessage from, final ChatMessageDto to) {
        final LocalDateTime now = LocalDateTime.now();
        to.setId(from.getId());
        to.setCreated(now);
        to.setUpdated(from.getUpdated());
        to.setId(from.getId());
        to.setBody(from.getBody());
        to.setType(from.getType());
        to.setSource(from.getSource());
        to.setAuthor(from.getAuthor());
    }
}

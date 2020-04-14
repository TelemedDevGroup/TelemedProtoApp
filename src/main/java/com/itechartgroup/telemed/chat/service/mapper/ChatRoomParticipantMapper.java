package com.itechartgroup.telemed.chat.service.mapper;

import com.itechartgroup.telemed.chat.dto.ChatRoomParticipantDto;
import com.itechartgroup.telemed.chat.entity.ChatRoomParticipant;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @author s.vareyko
 * @since 13.04.2020
 */
@Component
public class ChatRoomParticipantMapper {

    public Set<ChatRoomParticipant> mapDto(final Set<ChatRoomParticipantDto> list) {
        return list.stream().map(item -> ChatRoomParticipant.builder()
                .chatRoomId(item.getChatRoomId())
                .userId(item.getUserId())
                .unreadCount(item.getUnreadCount())
                .build()).collect(Collectors.toSet());
    }

    public Set<ChatRoomParticipantDto> mapEntity(final Set<ChatRoomParticipant> list) {
        return list.stream().map(item -> ChatRoomParticipantDto.builder()
                .chatRoomId(item.getChatRoomId())
                .userId(item.getUserId())
                .unreadCount(item.getUnreadCount())
                .build()).collect(Collectors.toSet());
    }

    public Set<ChatRoomParticipant> createEntities(final Collection<Long> list, final UUID chatRoomId) {
        return list.stream().map(item -> ChatRoomParticipant.builder()
                .chatRoomId(chatRoomId)
                .userId(item)
                .unreadCount(0L)
                .build()).collect(Collectors.toSet());
    }
}

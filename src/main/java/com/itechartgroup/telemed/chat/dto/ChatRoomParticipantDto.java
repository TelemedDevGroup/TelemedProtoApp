package com.itechartgroup.telemed.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * @author s.vareyko
 * @since 13.04.2020
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomParticipantDto {
    private UUID chatRoomId;
    private Long userId;
    private Long unreadCount;
    private String username;
}

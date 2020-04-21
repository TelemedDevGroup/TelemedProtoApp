package com.itechartgroup.telemed.chat.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private UUID chatRoomId;
    private UUID userId;
    private Long unreadCount;
    private String username;
}

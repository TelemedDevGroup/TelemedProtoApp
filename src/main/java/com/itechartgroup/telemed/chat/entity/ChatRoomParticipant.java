package com.itechartgroup.telemed.chat.entity;

import com.itechartgroup.telemed.utils.UUIDConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 12.04.2020
 */
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ChatRoomParticipantId.class)
public class ChatRoomParticipant {
    @Id
    @Convert(converter = UUIDConverter.class)
    private UUID chatRoomId;
    @Id
    @Convert(converter = UUIDConverter.class)
    private UUID userId;
    private Long unreadCount;
}

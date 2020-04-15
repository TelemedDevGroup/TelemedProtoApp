package com.itechartgroup.telemed.chat.entity;

import com.itechartgroup.telemed.utils.UUIDConverter;
import lombok.Data;

import javax.persistence.Convert;
import java.io.Serializable;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 14.04.2020
 */
@Data
public class ChatRoomParticipantId implements Serializable {
    @Convert(converter = UUIDConverter.class)
    private UUID chatRoomId;
    private UUID userId;
}

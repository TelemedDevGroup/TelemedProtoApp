package com.itechartgroup.telemed.chat.entity;

import com.itechartgroup.telemed.chat.dto.ChatMessageSource;
import com.itechartgroup.telemed.chat.dto.ChatMessageType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Data
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy =
            "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotNull
    private UUID room;
    @Enumerated(EnumType.STRING)
    private ChatMessageType type;
    @Enumerated(EnumType.STRING)
    private ChatMessageSource source;
    @Lob
    private String body;
    @CreatedBy
    private Long author;
    @CreatedDate
    private LocalDateTime created;
    @UpdateTimestamp
    private LocalDateTime updated;
}

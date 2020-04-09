package com.itechartgroup.telemedpoc.chat.entity;

import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Data
@Entity
public class ChatRoom {
    @Id
    private UUID id;
    // todo: add any number of participants
    private Long participantFirst;
    private Long participantSecond;
    private Long messageCount;
    @CreatedDate
    private LocalDateTime created;
    @UpdateTimestamp
    private LocalDateTime updated;
}

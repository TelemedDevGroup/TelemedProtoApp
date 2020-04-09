package com.itechartgroup.telemedpoc.chat.entity;

import com.itechartgroup.telemedpoc.chat.entity.converter.UUIDConverter;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Data
@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy =
            "org.hibernate.id.UUIDGenerator")
    @Convert(converter = UUIDConverter.class)
    private UUID id;
    @ElementCollection
    @CollectionTable(joinColumns = @JoinColumn(name = "chat_room_id"))
    @Column(name = "user_id")
    private Set<Long> participants;
    private Long messageCount = 0L;
    @CreatedDate
    private LocalDateTime created;
    @UpdateTimestamp
    private LocalDateTime updated;
}

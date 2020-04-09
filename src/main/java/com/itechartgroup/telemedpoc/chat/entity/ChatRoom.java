package com.itechartgroup.telemedpoc.chat.entity;

import lombok.Data;
import lombok.Generated;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.GeneratorType;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.id.UUIDGenerator;
import org.hibernate.tuple.ValueGenerator;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
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
    @GenericGenerator(name = "uuid", strategy =
            "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "uuid")
    private UUID id;
    /*@ElementCollection(targetClass = Long.class)
    @CollectionTable(joinColumns = @JoinColumn(name = "chat_room_id"))
    @Column(name = "user_id")*/
    @ElementCollection
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy =
            "org.hibernate.id.UUIDGenerator")
    @CollectionId(columns = @Column(name = "chat_room_id", updatable = false,
            nullable = false, columnDefinition = "BINARY(16)"), type = @Type(type =
            "java.util.UUID"), generator = "uuid")
    //@CollectionTable(joinColumns = @JoinColumn(name = "chat_room_id", referencedColumnName = "id"))
    @JoinColumn(name = "chat_room_id")
    private List<Long> participants;
    private Long messageCount = 0L;
    @CreatedDate
    private LocalDateTime created;
    @UpdateTimestamp
    private LocalDateTime updated;
}

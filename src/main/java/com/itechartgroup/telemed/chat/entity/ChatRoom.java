package com.itechartgroup.telemed.chat.entity;

import com.itechartgroup.telemed.chat.entity.converter.UUIDConverter;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
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
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Convert(converter = UUIDConverter.class)
    private UUID id;
    // todo: solve n+1 issue
    @OneToMany(mappedBy = "chatRoomId", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<ChatRoomParticipant> participants;
    private Long messageCount = 0L;
    private boolean isVideoActive = false;
    private LocalDateTime created;
    private LocalDateTime updated;
}

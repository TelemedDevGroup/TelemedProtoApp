package com.itechartgroup.telemed.chat.entity;

import com.itechartgroup.telemed.utils.UUIDConverter;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import static com.itechartgroup.telemed.chat.constant.ChatConstants.MESSAGE_PREVIEW_MAX_SIZE;
import static com.itechartgroup.telemed.chat.constant.ChatConstants.UNREAD_NO_MESSAGES;

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
    private Long messageCount = UNREAD_NO_MESSAGES;
    private boolean isVideoActive = false;
    private LocalDateTime created;
    private LocalDateTime updated;
    @Length(max = MESSAGE_PREVIEW_MAX_SIZE)
    private String lastMessage;
    private UUID lastAuthor;
}

package com.itechartgroup.telemed.chat.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.itechartgroup.telemed.security.UserPrincipal;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Data
@EqualsAndHashCode(of = "id")
public class ChatRoomDto implements Comparable<ChatRoomDto> {
    private static final Comparator<ChatRoomDto> COMPARATOR = Comparator
            .comparing(ChatRoomDto::getUpdated)
            .thenComparing(ChatRoomDto::getId);

    private UUID id;
    private Set<ChatRoomParticipantDto> participants;
    private Long messageCount;
    private LocalDateTime created;
    private LocalDateTime updated;

    // calculated properties
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private SortedSet<ChatMessageDto> messages = new TreeSet<>();

    /**
     * Special getter which provide unread count for current user.
     *
     * @return number of unread messages
     */
    @SuppressWarnings("unused")
    public long getUnreadCount() {
        final UUID userId = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::getPrincipal).map(details -> (UserPrincipal) details).map(UserPrincipal::getId)
                .orElse(new UUID(0,0));
        return participants.stream().filter(participant -> participant.getUserId().equals(userId)).findFirst()
                .map(ChatRoomParticipantDto::getUnreadCount).orElse(0L);
    }

    @Override
    public int compareTo(final ChatRoomDto other) {
        return COMPARATOR.compare(this, other);
    }

    protected ChatRoomDto copy() {
        final ChatRoomDto copy = new ChatRoomDto();
        copy.setId(getId());
        copy.setParticipants(getParticipants());
        copy.setMessageCount(getMessageCount());
        copy.setCreated(getCreated());
        copy.setUpdated(getUpdated());
        return copy;
    }
}

package com.itechartgroup.telemedpoc.chat.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Set;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Data
public class ChatRoomDto implements Comparable<ChatRoomDto> {
    private static final Comparator<ChatRoomDto> COMPARATOR = Comparator
            .comparing(ChatRoomDto::getUpdated)
            .thenComparing(ChatRoomDto::getId);

    private UUID id;
    private Set<Long> participants;
    private Long messageCount;
    private LocalDateTime created;
    private LocalDateTime updated;

    @Override
    public int compareTo(final ChatRoomDto other) {
        return COMPARATOR.compare(this, other);
    }
}

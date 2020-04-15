package com.itechartgroup.telemed.chat.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 07.04.2020
 */
@Data
public class ChatMessageDto implements Comparable<ChatMessageDto> {
    private static final Comparator<ChatMessageDto> COMPARATOR = Comparator
            .comparing(ChatMessageDto::getUpdated)
            .thenComparing(ChatMessageDto::getId);

    private UUID id;
    @NotNull
    private UUID room;
    @NotNull
    private ChatMessageType type;
    private ChatMessageSource source;
    private Long author;
    @NotEmpty
    private String body; // todo: add multipart for images/docs
    private LocalDateTime created;
    private LocalDateTime updated;

    @Override
    public int compareTo(final ChatMessageDto other) {
        return COMPARATOR.compare(this, other);
    }
}

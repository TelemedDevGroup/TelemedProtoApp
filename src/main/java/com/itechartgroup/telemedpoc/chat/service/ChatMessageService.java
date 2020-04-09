package com.itechartgroup.telemedpoc.chat.service;

import com.itechartgroup.telemedpoc.chat.dto.ChatMessageDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.SortedSet;
import java.util.UUID;

/**
 * Message service with long polling strategy.
 *
 * @author s.vareyko
 * @since 07.04.2020
 */
public interface ChatMessageService {

    /**
     * Publish new message.
     *
     * @param dto to be sent
     * @return created message info
     */
    ChatMessageDto send(ChatMessageDto dto);

    /**
     * Load all messages or subscribe for 25 seconds.
     *
     * @param dialogId UUID of the dialog
     * @param page     for search
     * @return page with elements if its exists
     */
    Page<ChatMessageDto> load(UUID dialogId, Pageable page);

    /**
     * Load all newest messages or subscribe for 25 seconds.
     *
     * @param timestamp for defining moment from which should be loaded messages
     * @return sorted set of new messages
     */
    SortedSet<ChatMessageDto> poll(long timestamp);
}

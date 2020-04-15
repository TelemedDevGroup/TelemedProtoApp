package com.itechartgroup.telemed.chat.service;

import com.itechartgroup.telemed.chat.dto.ChatMessageDto;
import com.itechartgroup.telemed.chat.dto.ChatRoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
     * @param roomId UUID of the room
     * @param page   for search
     * @return page with elements if its exists
     */
    Page<ChatMessageDto> load(UUID roomId, Pageable page);

    /**
     * Load all newest messages or subscribe for 25 seconds.
     *
     * @param timestamp for defining moment from which should be loaded messages
     * @return sorted set of new messages
     */
    SortedSet<ChatRoomDto> poll(long timestamp, long userId);
}

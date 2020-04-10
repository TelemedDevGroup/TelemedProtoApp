package com.itechartgroup.telemedpoc.chat.service;

import com.itechartgroup.telemedpoc.chat.dto.ChatRoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
public interface ChatRoomService {

    /**
     * Create new chat room entry and provide entity which was created.
     *
     * @param participants one of participants
     * @return just save entity
     */
    ChatRoomDto create(Set<Long> participants);

    /**
     * Load page of chat rooms for user.
     *
     * @param page   pagination info
     * @param userId current user's id
     * @return sorted by date set of chat rooms
     */
    Page<ChatRoomDto> load(Pageable page, final Long userId);

    /**
     * Method for updating of date when latest actions occurred in the chat room.
     *
     * @param id        of chat room to be updated
     * @param increment should be incremented counter of messages
     * @return updated room
     */
    ChatRoomDto updateRoomAndGet(UUID id, final boolean increment);
}

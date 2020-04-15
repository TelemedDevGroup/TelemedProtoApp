package com.itechartgroup.telemed.chat.service;

import com.itechartgroup.telemed.chat.dto.ChatMessageDto;
import com.itechartgroup.telemed.chat.dto.ChatRoomDto;
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
     * @param message based on which should be updated room
     * @return updated room
     */
    ChatRoomDto updateRoomAndGet(ChatMessageDto message);

    /**
     * Method that marks some specific room read by current user.
     *
     * @param userId current user id
     * @param roomId to be updated
     * @return updated room dto
     */
    ChatRoomDto markAsRead(Long userId, UUID roomId);
}

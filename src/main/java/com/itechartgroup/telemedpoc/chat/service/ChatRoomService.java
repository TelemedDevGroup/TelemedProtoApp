package com.itechartgroup.telemedpoc.chat.service;

import com.itechartgroup.telemedpoc.chat.dto.ChatRoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
public interface ChatRoomService {

    /**
     * Create new dialog entry and provide entity which was created.
     *
     * @param participants one of participants
     * @return just save entity
     */
    ChatRoomDto create(List<Long> participants);

    /**
     * Load page of dialogs for user.
     *
     * @param page pagination info
     * @return sorted by date set of dialogs
     */
    Page<ChatRoomDto> load(Pageable page);

    /**
     * Method for updating of date when latest actions occurred in the dialog.
     *
     * @param id        of dialog to be updated
     * @param increment should be incremented counter of messages
     * @return updated room
     */
    ChatRoomDto updateRoomAndGet(UUID id, final boolean increment);
}

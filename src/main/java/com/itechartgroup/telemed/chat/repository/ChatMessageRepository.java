package com.itechartgroup.telemed.chat.repository;

import com.itechartgroup.telemed.chat.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    Page<ChatMessage> findAllByRoomOrderByCreatedDesc(UUID roomId, Pageable page);
}

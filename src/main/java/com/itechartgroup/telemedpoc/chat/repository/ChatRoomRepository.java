package com.itechartgroup.telemedpoc.chat.repository;

import com.itechartgroup.telemedpoc.chat.entity.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {

    Page<ChatRoom> findAllByParticipantFirstOrParticipantSecondOrderByUpdatedDesc(Long participantFirst, Long participantSecond, Pageable pageable);
}

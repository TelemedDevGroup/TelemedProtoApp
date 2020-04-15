package com.itechartgroup.telemed.chat.repository;

import com.itechartgroup.telemed.chat.entity.ChatRoomParticipant;
import com.itechartgroup.telemed.chat.entity.ChatRoomParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author s.vareyko
 * @since 14.04.2020
 */
@Repository
public interface ChatRoomParticipantRepository extends JpaRepository<ChatRoomParticipant, ChatRoomParticipantId> {
}

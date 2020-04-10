package com.itechartgroup.telemed.video.service;

import com.itechartgroup.telemed.security.UserPrincipal;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface VideoService {

    String createRoom(UserPrincipal currentUser, @Param("participantIds") Set<Long> calleeIds);

    String joinRoom(UserPrincipal currentUser, String roomId);
}

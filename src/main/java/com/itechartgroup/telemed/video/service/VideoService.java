package com.itechartgroup.telemed.video.service;

import com.itechartgroup.telemed.security.UserPrincipal;
import org.springframework.data.repository.query.Param;

import java.util.Set;
import java.util.UUID;

public interface VideoService {

    String createRoom(String currentUserName, UUID roomId, Set<Long> participantIds);

    String joinRoom(UserPrincipal currentUser, String roomId);

    void finishVideoRoom(String roomId);
}

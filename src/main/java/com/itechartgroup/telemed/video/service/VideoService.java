package com.itechartgroup.telemed.video.service;

import com.itechartgroup.telemed.security.UserPrincipal;

public interface VideoService {

    String createVideoCall(String currentUserName, String roomId);

    String joinRoom(UserPrincipal currentUser, String roomId);

    void finishVideoRoom(String roomId);
}

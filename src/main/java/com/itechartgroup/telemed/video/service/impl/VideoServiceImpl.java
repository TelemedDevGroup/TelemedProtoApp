package com.itechartgroup.telemed.video.service.impl;

import com.itechartgroup.telemed.security.UserPrincipal;
import com.itechartgroup.telemed.video.config.TwilioProperties;
import com.itechartgroup.telemed.video.entity.VideoRoom;
import com.itechartgroup.telemed.video.exception.VideoRoomNotFoundException;
import com.itechartgroup.telemed.video.repository.VideoRoomRepository;
import com.itechartgroup.telemed.video.service.VideoService;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class VideoServiceImpl implements VideoService {

    private final TwilioProperties twilioProperties;

    private final VideoRoomRepository videoRoomRepository;

    @Override
    public String createRoom(UserPrincipal currentUser, Set<Long> calleeIds) {
        VideoRoom videoRoom = createRoom(currentUser.getId(), calleeIds);
        String roomName = videoRoom.getId().toString();

        return generateToken(currentUser.getName(), roomName).toJwt();
    }

    private AccessToken generateToken(String userIdentity, String roomName) {
        VideoGrant grant = new VideoGrant();
        grant.setRoom(roomName);

        AccessToken.Builder tokenBuilder = new AccessToken.Builder(
                twilioProperties.getApiAccountSid(),
                twilioProperties.getApiKeySid(),
                twilioProperties.getApiKeySecret());

        return tokenBuilder
                .identity(userIdentity)
                .ttl(twilioProperties.getTokenTimeToLive())
                .grant(grant)
                .build();
    }

    private VideoRoom createRoom(Long callerId, Set<Long> calleeIds) {
        VideoRoom videoRoom = new VideoRoom();
        videoRoom.setCreated(LocalDateTime.now());

        HashSet<Long> participants = new HashSet<>(calleeIds);
        participants.add(callerId);
        videoRoom.setParticipants(participants);

        return videoRoomRepository.save(videoRoom);
    }

    @Override
    @Transactional(readOnly = true)
    public String joinRoom(UserPrincipal currentUser, String roomId) {
        boolean roomExists = videoRoomRepository.existsById(UUID.fromString(roomId));

        if (!roomExists) {
            throw new VideoRoomNotFoundException();
        }

        return generateToken(currentUser.getName(), roomId).toJwt();
    }

}

package com.itechartgroup.telemed.video.service.impl;

import com.itechartgroup.telemed.chat.entity.ChatRoom;
import com.itechartgroup.telemed.chat.exception.ChatRoomNotFoundException;
import com.itechartgroup.telemed.chat.repository.ChatRoomRepository;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class VideoServiceImpl implements VideoService {

    private final TwilioProperties twilioProperties;

    private final VideoRoomRepository videoRoomRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Override
    public String createVideoCall(String currentUserName, String roomId) {
        VideoRoom videoRoom = createVideoRoom(roomId);

        String roomName = videoRoom.getId().toString();

        return generateToken(currentUserName, roomName).toJwt();
    }

    private VideoRoom createVideoRoom(String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(UUID.fromString(roomId))
                .orElseThrow(ChatRoomNotFoundException::new);
        chatRoom.setVideoActive(true);

        VideoRoom videoRoom = new VideoRoom();
        videoRoom.setChatRoom(chatRoom);
        videoRoom.setCreated(LocalDateTime.now());

        videoRoomRepository.save(videoRoom);

        return videoRoom;
    }

    private AccessToken generateToken(String userIdentity, String roomName) {
        VideoGrant grant = new VideoGrant();
        //grant.setRoom(roomName);
        grant.setRoom("demo_room");

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

    @Override
    @Transactional(readOnly = true)
    public String joinRoom(UserPrincipal currentUser, String roomId) {
        boolean roomExists = videoRoomRepository.existsById(UUID.fromString(roomId));

        if (!roomExists) {
            throw new VideoRoomNotFoundException();
        }

        return generateToken(currentUser.getName(), roomId).toJwt();
    }

    @Override
    public void finishVideoRoom(String roomId) {
        VideoRoom videoRoom = videoRoomRepository.getOne(UUID.fromString(roomId));
        videoRoom.getChatRoom().setVideoActive(false);
        videoRoomRepository.save(videoRoom);
    }

}

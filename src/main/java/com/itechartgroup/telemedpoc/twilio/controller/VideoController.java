package com.itechartgroup.telemedpoc.twilio.controller;

import com.itechartgroup.telemedpoc.twilio.config.TwilioProperties;
import com.itechartgroup.telemedpoc.twilio.dto.RoomConnection;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("twilio")
@RequiredArgsConstructor
public class VideoController {

    private final TwilioProperties twilioProperties;

    @GetMapping("token")
    public RoomConnection token() {
        String identity = "patient Nick";
        String roomName = "demo_room";

        VideoGrant grant = new VideoGrant();
        grant.setRoom(roomName);

        AccessToken token = new AccessToken.Builder(
                twilioProperties.getApiAccountSid(),
                twilioProperties.getApiKeySid(),
                twilioProperties.getApiKeySecret()
        ).identity(identity).ttl(twilioProperties.getTokenTimeToLive()).grant(grant).build();

        return new RoomConnection(token.toJwt(), identity);
    }

}

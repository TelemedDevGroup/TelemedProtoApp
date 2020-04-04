package com.itechartgroup.telemedpoc.twilio.controller;

import com.itechartgroup.telemedpoc.twilio.TwilioProperties;
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
    public String token() {
        VideoGrant grant = new VideoGrant();
        grant.setRoom("demo_room");

        AccessToken token = new AccessToken.Builder(
                twilioProperties.getApiAccountSid(),
                twilioProperties.getApiKeySid(),
                twilioProperties.getApiKeySecret()
        ).identity("user_name").ttl(twilioProperties.getTokenTimeToLive()).grant(grant).build();

        return token.toJwt();
    }

}

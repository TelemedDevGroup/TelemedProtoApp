package com.itechartgroup.telemedpoc.twilio;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "twilio")
@ConstructorBinding
@RequiredArgsConstructor
@Getter
public class TwilioProperties {

    private final String apiAccountSid;
    private final String apiKeySid;
    private final String apiKeySecret;
    private final int tokenTimeToLive;

}

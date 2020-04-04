package com.itechartgroup.telemedpoc.config;

import com.itechartgroup.telemedpoc.twilio.TwilioProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(TwilioProperties.class)
public class TwilioConfiguration {

}

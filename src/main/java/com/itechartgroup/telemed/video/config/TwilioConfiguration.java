package com.itechartgroup.telemed.video.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(TwilioProperties.class)
public class TwilioConfiguration {

}

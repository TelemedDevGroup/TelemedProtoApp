package com.itechartgroup.telemedpoc.chat.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author s.vareyko
 * @since 10.04.2020
 */
@Getter
@Configuration
@ConfigurationProperties(prefix = "chat")
public class ChatProperties {

    /**
     * The maximum amount of millis, during which request will be on hold if nothing happens.
     */
    private long pollingTimeout = 25000L;
    /**
     * The amount of millis, during which sent message will be stored in memory for polling.
     */
    private long holdTimeout = 5000L;
}

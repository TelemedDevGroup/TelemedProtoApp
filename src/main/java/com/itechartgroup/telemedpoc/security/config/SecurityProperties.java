package com.itechartgroup.telemedpoc.security.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "security")
@Getter
public class SecurityProperties {

    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();

    @Data
    public static class Auth {

        private String tokenSecret;
        private long tokenExpirationMsec;
    }

    public static final class OAuth2 {

        @Getter
        private List<String> authorizedRedirectUris = new ArrayList<>();

        public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
            return this;
        }
    }
}

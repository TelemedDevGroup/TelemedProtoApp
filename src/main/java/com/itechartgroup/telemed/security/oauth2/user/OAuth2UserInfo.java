package com.itechartgroup.telemed.security.oauth2.user;

import lombok.Getter;

import java.util.Map;

public abstract class OAuth2UserInfo {

    @Getter
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getImageUrl();
}

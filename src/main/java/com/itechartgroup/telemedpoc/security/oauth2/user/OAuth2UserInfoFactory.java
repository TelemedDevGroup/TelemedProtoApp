package com.itechartgroup.telemedpoc.security.oauth2.user;

import com.itechartgroup.telemedpoc.exception.OAuth2AuthenticationProcessingException;
import com.itechartgroup.telemedpoc.security.oauth2.AuthProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.GOOGLE.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.FACEBOOK.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException(
                    String.format("Sorry! Login with %s is not supported yet.", registrationId));
        }
    }
}

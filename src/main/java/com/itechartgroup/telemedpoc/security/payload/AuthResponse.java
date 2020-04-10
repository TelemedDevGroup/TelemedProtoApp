package com.itechartgroup.telemedpoc.security.payload;

import com.itechartgroup.telemedpoc.security.entity.User;
import lombok.Data;

@Data
public class AuthResponse {

    private String accessToken;
    private User user;
    private String tokenType = "Bearer";

    public AuthResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
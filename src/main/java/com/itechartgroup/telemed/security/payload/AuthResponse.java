package com.itechartgroup.telemed.security.payload;

import com.itechartgroup.telemed.security.entity.User;
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

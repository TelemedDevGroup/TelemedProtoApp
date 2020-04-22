package com.itechartgroup.telemed.security.dto;

import com.itechartgroup.telemed.security.entity.Role;
import com.itechartgroup.telemed.security.oauth2.AuthProvider;
import lombok.Builder;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class UserDTO {

    private UUID id;
    private String name;
    private String email;
    private String imageUrl;
    private Boolean emailVerified = false;
    private AuthProvider provider;
    private String providerId;
    private Set<Role> roles;
}

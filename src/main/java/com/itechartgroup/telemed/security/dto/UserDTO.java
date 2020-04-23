package com.itechartgroup.telemed.security.dto;

import com.itechartgroup.telemed.security.entity.Role;
import com.itechartgroup.telemed.security.oauth2.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO implements Serializable {

    private UUID id;
    private String name;
    private String email;
    private String imageUrl;
    private Boolean emailVerified = false;
    private AuthProvider provider;
    private String providerId;
    private Set<Role> roles;
}

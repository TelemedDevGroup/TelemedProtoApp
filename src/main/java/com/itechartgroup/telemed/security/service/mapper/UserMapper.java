package com.itechartgroup.telemed.security.service.mapper;

import com.itechartgroup.telemed.security.dto.UserDTO;
import com.itechartgroup.telemed.security.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO mapDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .imageUrl(user.getImageUrl())
                .emailVerified(user.getEmailVerified())
                .provider(user.getProvider())
                .providerId(user.getProviderId())
                .roles(user.getRoles())
                .build();
    }

    public User map(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setEmailVerified(dto.getEmailVerified());
        user.setProvider(dto.getProvider());
        user.setProviderId(dto.getProviderId());
        user.setRoles(dto.getRoles());
        return user;
    }
}

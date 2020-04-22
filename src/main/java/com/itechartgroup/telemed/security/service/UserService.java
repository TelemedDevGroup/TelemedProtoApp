package com.itechartgroup.telemed.security.service;

import com.itechartgroup.telemed.security.dto.UserDTO;

import java.util.Collection;
import java.util.UUID;

public interface UserService {

    UserDTO getUserById(UUID userId);

    Collection<UserDTO> getAvailableDoctors(UUID userId);

    Collection<UserDTO> getAvailableUsers(UUID userId);
}

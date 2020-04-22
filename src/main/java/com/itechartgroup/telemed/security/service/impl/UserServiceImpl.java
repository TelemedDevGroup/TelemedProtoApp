package com.itechartgroup.telemed.security.service.impl;

import com.itechartgroup.telemed.security.dto.UserDTO;
import com.itechartgroup.telemed.security.repository.UserRepository;
import com.itechartgroup.telemed.security.service.UserService;
import com.itechartgroup.telemed.security.service.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;

    @Override
    public UserDTO getUserById(UUID userId) {
        return userMapper.mapDto(userRepository.getOne(userId));
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<UserDTO> getAvailableDoctors(UUID userId) {
        return userRepository.getAvailableDoctors(userId).map(userMapper::mapDto).collect(Collectors.toSet());
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<UserDTO> getAvailableUsers(UUID userId) {
        return userRepository.findByIdNot(userId).map(userMapper::mapDto).collect(Collectors.toSet());
    }
}

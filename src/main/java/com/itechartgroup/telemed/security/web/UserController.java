package com.itechartgroup.telemed.security.web;

import com.itechartgroup.telemed.exception.ResourceNotFoundException;
import com.itechartgroup.telemed.security.CurrentUser;
import com.itechartgroup.telemed.security.UserPrincipal;
import com.itechartgroup.telemed.security.dto.UserDTO;
import com.itechartgroup.telemed.security.entity.User;
import com.itechartgroup.telemed.security.repository.UserRepository;
import com.itechartgroup.telemed.security.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private UserRepository userRepository;
    private UserService userService;

    @GetMapping("/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/doctors")
    public ResponseEntity<Collection<UserDTO>> getAvailableDoctors(@CurrentUser UserPrincipal userPrincipal) {
        return new ResponseEntity<>(userService.getAvailableDoctors(userPrincipal.getId()), HttpStatus.OK);
    }

    @PostMapping("/available")
    public ResponseEntity<Collection<UserDTO>> getAvailableUsers(@CurrentUser UserPrincipal userPrincipal) {
        return new ResponseEntity<>(userService.getAvailableUsers(userPrincipal.getId()), HttpStatus.OK);
    }
}

package com.itechartgroup.telemedpoc.chat.utils;

import com.itechartgroup.telemedpoc.security.UserPrincipal;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * @author s.vareyko
 * @since 08.04.2020
 */
@UtilityClass
public class UserDetailsUtils {

    public static Long currentUserId() {
        return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getPrincipal)
                .map(principal -> (UserPrincipal) principal)
                .map(UserPrincipal::getId)
                .orElse(null);
    }
}

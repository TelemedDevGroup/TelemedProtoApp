package com.itechartgroup.telemed.availability.web;

import com.itechartgroup.telemed.availability.dto.AvailabilitySlotDTO;
import com.itechartgroup.telemed.availability.service.AvailabilityService;
import com.itechartgroup.telemed.security.CurrentUser;
import com.itechartgroup.telemed.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @PostMapping
    public ResponseEntity<AvailabilitySlotDTO> createAvailabilityEvent(
            @CurrentUser UserPrincipal currentUser, @RequestBody AvailabilitySlotDTO slot) {
        AvailabilitySlotDTO dto = availabilityService.createAvailabilitySlot(currentUser.getId(), slot);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("{userId}")
    public List<AvailabilitySlotDTO> getUsrAvailabilitySlots(@PathVariable String userId) {
        return availabilityService.getAvailabilitySlots(userId);
    }
}

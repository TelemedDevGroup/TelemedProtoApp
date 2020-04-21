package com.itechartgroup.telemed.availability.service;

import com.itechartgroup.telemed.availability.dto.AvailabilitySlotDTO;

import java.util.List;
import java.util.UUID;

public interface AvailabilityService {

    List<AvailabilitySlotDTO> createAvailabilitySlot(UUID userId, List<AvailabilitySlotDTO> slot);

    void updateAvailabilitySlot(UUID userId, AvailabilitySlotDTO slot);

    void deleteAvailabilitySlot(UUID userId, AvailabilitySlotDTO slot);

    List<AvailabilitySlotDTO> getAvailabilitySlots(String userId);
}

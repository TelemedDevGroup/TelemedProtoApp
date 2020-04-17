package com.itechartgroup.telemed.appointment.service;

import com.itechartgroup.telemed.appointment.dto.AvailabilitySlotDTO;

import java.util.List;
import java.util.UUID;

public interface AvailabilityService {

    AvailabilitySlotDTO createAvailabilitySlot(UUID userId, AvailabilitySlotDTO slot);

    List<AvailabilitySlotDTO> getAvailabilitySlots(String userId);
}

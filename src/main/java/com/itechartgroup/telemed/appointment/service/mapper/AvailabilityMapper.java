package com.itechartgroup.telemed.appointment.service.mapper;

import com.itechartgroup.telemed.appointment.dto.AvailabilitySlotDTO;
import com.itechartgroup.telemed.appointment.entity.AvailabilitySlot;
import com.itechartgroup.telemed.security.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AvailabilityMapper {

    public AvailabilitySlotDTO mapDto(AvailabilitySlot availabilitySlot) {
        return AvailabilitySlotDTO.builder()
                .start(availabilitySlot.getStart())
                .end(availabilitySlot.getEnd())
                .recurrenceRule(availabilitySlot.getRecurrenceRule())
                .build();
    }

    public AvailabilitySlot map(User user, AvailabilitySlotDTO dto) {
        AvailabilitySlot availabilitySlot = new AvailabilitySlot();
        availabilitySlot.setUser(user);
        availabilitySlot.setStart(dto.getStart());
        availabilitySlot.setEnd(dto.getEnd());
        return availabilitySlot;
    }

}

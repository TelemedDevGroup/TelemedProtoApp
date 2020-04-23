package com.itechartgroup.telemed.availability.service.mapper;

import com.itechartgroup.telemed.availability.dto.AvailabilitySlotDTO;
import com.itechartgroup.telemed.availability.entity.AvailabilitySlot;
import com.itechartgroup.telemed.security.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AvailabilityMapper {

    public AvailabilitySlotDTO mapDto(AvailabilitySlot availabilitySlot) {
        return AvailabilitySlotDTO.builder()
                .id(availabilitySlot.getId().toString())
                .subject(availabilitySlot.getSubject())
                .start(availabilitySlot.getStart())
                .end(availabilitySlot.getEnd())
                .recurrenceRule(availabilitySlot.getRecurrenceRule())
                .build();
    }

    public void update(AvailabilitySlot availabilitySlot, AvailabilitySlotDTO dto) {
        availabilitySlot.setSubject(dto.getSubject());
        availabilitySlot.setStart(dto.getStart());
        availabilitySlot.setEnd(dto.getEnd());
        availabilitySlot.setRecurrenceRule(dto.getRecurrenceRule());
    }

    public AvailabilitySlot map(User user, AvailabilitySlotDTO dto) {
        AvailabilitySlot availabilitySlot = new AvailabilitySlot();
        availabilitySlot.setUser(user);
        availabilitySlot.setSubject(dto.getSubject());
        availabilitySlot.setStart(dto.getStart());
        availabilitySlot.setEnd(dto.getEnd());
        availabilitySlot.setRecurrenceRule(dto.getRecurrenceRule());
        return availabilitySlot;
    }

}

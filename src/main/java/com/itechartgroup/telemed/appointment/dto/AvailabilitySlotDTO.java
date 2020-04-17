package com.itechartgroup.telemed.appointment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AvailabilitySlotDTO {

    private final LocalDateTime start;
    private final LocalDateTime end;
    private final String recurrenceRule;

}

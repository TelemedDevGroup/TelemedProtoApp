package com.itechartgroup.telemed.availability.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AvailabilitySlotDTO {

    private final String id;
    @JsonProperty("StartTime")
    private final LocalDateTime start;
    @JsonProperty("EndTime")
    private final LocalDateTime end;
    private final String recurrenceRule;

}

package com.itechartgroup.telemed.availability.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class AvailabilitySlotDTO {

    private final String id;
    @JsonProperty("StartTime")
    private final ZonedDateTime start;
    @JsonProperty("EndTime")
    private final ZonedDateTime end;
    private final String recurrenceRule;

}

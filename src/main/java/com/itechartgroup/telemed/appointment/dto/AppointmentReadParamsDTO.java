package com.itechartgroup.telemed.appointment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentReadParamsDTO {

    @JsonProperty("StartDate")
    private ZonedDateTime startDate;
    @JsonProperty("EndDate")
    private ZonedDateTime endDate;
}

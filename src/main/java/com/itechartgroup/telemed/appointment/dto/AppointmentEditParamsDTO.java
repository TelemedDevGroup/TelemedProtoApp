package com.itechartgroup.telemed.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentEditParamsDTO {

    private String action;
    private List<AppointmentDTO> added;
    private List<AppointmentDTO> changed;
    private List<AppointmentDTO> deleted;
}

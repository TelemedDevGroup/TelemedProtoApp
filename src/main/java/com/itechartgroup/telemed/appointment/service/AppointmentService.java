package com.itechartgroup.telemed.appointment.service;

import com.itechartgroup.telemed.appointment.dto.AppointmentDTO;
import com.itechartgroup.telemed.appointment.dto.AppointmentReadParamsDTO;

import java.util.Collection;
import java.util.UUID;

public interface AppointmentService {

    Collection<AppointmentDTO> getAll(UUID userId);

    Collection<AppointmentDTO> getByDateRange(UUID userId, AppointmentReadParamsDTO readParams);

    AppointmentDTO updateAppointment(UUID userId, AppointmentDTO appointment);

    AppointmentDTO saveAppointment(UUID userId, AppointmentDTO appointment);

    AppointmentDTO deleteAppointment(AppointmentDTO appointment);
}

package com.itechartgroup.telemed.appointment.service;

import com.itechartgroup.telemed.appointment.dto.AppointmentDTO;
import com.itechartgroup.telemed.appointment.dto.AppointmentReadParamsDTO;
import com.itechartgroup.telemed.appointment.entity.Appointment;

import java.util.Collection;
import java.util.UUID;

public interface AppointmentService {

    Collection<Appointment> getAll(UUID userId);

    Collection<Appointment> getByDateRange(UUID userId, AppointmentReadParamsDTO readParams);

    AppointmentDTO saveAppointment(UUID userId, AppointmentDTO appointment);

    AppointmentDTO deleteAppointment(AppointmentDTO appointment);
}

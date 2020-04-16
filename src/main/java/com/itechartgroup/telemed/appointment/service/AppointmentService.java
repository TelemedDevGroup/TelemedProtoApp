package com.itechartgroup.telemed.appointment.service;

import com.itechartgroup.telemed.appointment.entity.Appointment;

import java.util.Collection;

public interface AppointmentService {

    Collection<Appointment> getAll();
}

package com.itechartgroup.telemed.appointment.service.impl;

import com.itechartgroup.telemed.appointment.entity.Appointment;
import com.itechartgroup.telemed.appointment.repository.AppointmentRepository;
import com.itechartgroup.telemed.appointment.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentRepository appointmentRepository;

    public Collection<Appointment> getAll() {
        return appointmentRepository.findAll();
    }
}

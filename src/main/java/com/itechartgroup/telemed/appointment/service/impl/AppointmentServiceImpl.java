package com.itechartgroup.telemed.appointment.service.impl;

import com.itechartgroup.telemed.appointment.entity.Appointment;
import com.itechartgroup.telemed.appointment.repository.AppointmentRepository;
import com.itechartgroup.telemed.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Collection<Appointment> getAll() {
        return appointmentRepository.findAll();
    }
}

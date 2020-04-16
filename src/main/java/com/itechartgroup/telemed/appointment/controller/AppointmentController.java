package com.itechartgroup.telemed.appointment.controller;

import com.itechartgroup.telemed.appointment.entity.Appointment;
import com.itechartgroup.telemed.appointment.service.impl.AppointmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentServiceImpl appointmentService;

    @GetMapping("/api/appointment/test")
    public ResponseEntity<Collection<Appointment>> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAll(), HttpStatus.OK);
    }
}

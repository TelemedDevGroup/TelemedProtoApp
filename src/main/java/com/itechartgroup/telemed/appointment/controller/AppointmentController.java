package com.itechartgroup.telemed.appointment.controller;

import com.itechartgroup.telemed.appointment.entity.Appointment;
import com.itechartgroup.telemed.appointment.service.AppointmentService;
import com.itechartgroup.telemed.appointment.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController("/api")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AvailabilityService availabilityService;

    @GetMapping("/appointment/test")
    public ResponseEntity<Collection<Appointment>> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAll(), HttpStatus.OK);
    }

}

package com.itechartgroup.telemed.appointment.service.mapper;

import com.itechartgroup.telemed.appointment.dto.AppointmentDTO;
import com.itechartgroup.telemed.appointment.entity.Appointment;

import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public AppointmentDTO mapDto(Appointment appointment) {
        return AppointmentDTO.builder()
                .subject(appointment.getSubject())
                .startTimestamp(appointment.getStartTimestamp())
                .endTimestamp(appointment.getEndTimestamp())
                .location(appointment.getLocation())
                .description(appointment.getDescription())
                .videoRoom(appointment.getVideoRoom())
                .isAllDay(appointment.isAllDay())
                .recurrenceRule(appointment.getRecurrenceRule())
                .participants(appointment.getParticipants())
                .build();
    }

    public Appointment map(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        appointment.setSubject(dto.getSubject());
        appointment.setStartTimestamp(dto.getStartTimestamp());
        appointment.setEndTimestamp(dto.getEndTimestamp());
        appointment.setLocation(dto.getLocation());
        appointment.setDescription(dto.getDescription());
        appointment.setVideoRoom(dto.getVideoRoom());
        appointment.setAllDay(dto.isAllDay());
        appointment.setRecurrenceRule(dto.getRecurrenceRule());
        return appointment;
    }
}

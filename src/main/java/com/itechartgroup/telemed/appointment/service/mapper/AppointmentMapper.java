package com.itechartgroup.telemed.appointment.service.mapper;

import com.itechartgroup.telemed.appointment.dto.AppointmentDTO;
import com.itechartgroup.telemed.appointment.entity.Appointment;

import com.itechartgroup.telemed.security.dto.UserDTO;
import com.itechartgroup.telemed.security.service.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AppointmentMapper {

    private UserMapper userMapper;

    public AppointmentDTO mapDto(Appointment appointment) {

        AppointmentDTO dto = AppointmentDTO.builder()
                .id(appointment.getId())
                .subject(appointment.getSubject())
                .startTimestamp(appointment.getStartTimestamp())
                .endTimestamp(appointment.getEndTimestamp())
                .location(appointment.getLocation())
                .description(appointment.getDescription())
                .videoRoom(appointment.getVideoRoom())
                .isAllDay(appointment.isAllDay())
                .recurrenceRule(appointment.getRecurrenceRule())
                .participants(appointment.getParticipants()
                        .stream().map(userMapper::mapDto).collect(Collectors.toSet()))
                .build();

        Set<UUID> participantsIds = new HashSet<>(appointment.getParticipants().size());
        for(UserDTO participant : dto.getParticipants()) {
            participantsIds.add(participant.getId());
        }

        dto.setParticipantIds(participantsIds);
        return dto;
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

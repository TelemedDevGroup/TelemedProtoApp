package com.itechartgroup.telemed.appointment.service.impl;

import com.itechartgroup.telemed.appointment.dto.AppointmentDTO;
import com.itechartgroup.telemed.appointment.dto.AppointmentReadParamsDTO;
import com.itechartgroup.telemed.appointment.entity.Appointment;
import com.itechartgroup.telemed.appointment.entity.AppointmentRequestStatus;
import com.itechartgroup.telemed.appointment.entity.AssignUserToAppointment;
import com.itechartgroup.telemed.appointment.repository.AppointmentRepository;
import com.itechartgroup.telemed.appointment.repository.AssignUserToAppointmentRepository;
import com.itechartgroup.telemed.appointment.service.AppointmentService;
import com.itechartgroup.telemed.appointment.service.mapper.AppointmentMapper;
import com.itechartgroup.telemed.security.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentMapper appointmentMapper;
    private UserRepository userRepository;
    private AppointmentRepository appointmentRepository;
    private AssignUserToAppointmentRepository userToAppointmentRepository;

    @Override
    @Transactional(readOnly = true)
    public Collection<AppointmentDTO> getAll(UUID userId) {
        return appointmentRepository.findByParticipants(userId)
                .map(appointmentMapper::mapDto)
                .collect(Collectors.toSet());
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<AppointmentDTO> getByDateRange(UUID userId, AppointmentReadParamsDTO readParams) {
        return appointmentRepository.getByDateRange(userId, readParams.getStartDate(), readParams.getEndDate())
                .map(appointmentMapper::mapDto)
                .collect(Collectors.toSet());
    }

    @Override
    public AppointmentDTO saveAppointment(UUID ownerId, AppointmentDTO dto) {
        Set<UUID> participantIds = dto.getParticipantIds();
        participantIds.add(ownerId);
        Appointment entity = appointmentMapper.map(dto);
        appointmentRepository.save(entity);

        saveAppointmentParticipants(ownerId, entity, participantIds);
        return appointmentMapper.mapDto(entity);
    }

    private void saveAppointmentParticipants(UUID ownerId, Appointment entity, Set<UUID> participantIds) {
        final UUID appointmentId = entity.getId();
        List<AssignUserToAppointment> lst = new ArrayList<>(participantIds.size());
        for (UUID userId : participantIds) {
            AssignUserToAppointment mapping = AssignUserToAppointment.builder()
                    .appointmentId(appointmentId)
                    .userId(userId)
                    .build();

            if (ownerId.equals(userId)) {
                mapping.setRequestStatus(AppointmentRequestStatus.APPROVED);
            } else {
                mapping.setRequestStatus(AppointmentRequestStatus.REQUESTED);
            }
            lst.add(mapping);
        }
        userToAppointmentRepository.saveAll(lst);
        entity.setParticipants(new HashSet<>(userRepository.findAllById(participantIds)));
    }

    @Override
    public AppointmentDTO deleteAppointment(AppointmentDTO dto) {
        Set<UUID> participantIds = dto.getParticipantIds();
        UUID appointmentId = dto.getId();
        userToAppointmentRepository.removeParticipants(participantIds, appointmentId);
        appointmentRepository.deleteById(dto.getId());
        return dto;
    }
}

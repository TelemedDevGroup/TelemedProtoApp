package com.itechartgroup.telemed.appointment.service.impl;

import com.itechartgroup.telemed.appointment.AvailabilityException;
import com.itechartgroup.telemed.appointment.dto.AvailabilitySlotDTO;
import com.itechartgroup.telemed.appointment.entity.AvailabilitySlot;
import com.itechartgroup.telemed.appointment.repository.AvailabilityRepository;
import com.itechartgroup.telemed.appointment.service.AvailabilityService;
import com.itechartgroup.telemed.appointment.service.mapper.AvailabilityMapper;
import com.itechartgroup.telemed.security.entity.User;
import com.itechartgroup.telemed.security.repository.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Data
@Service
public class AvailabilityServiceImpl implements AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    private AvailabilityMapper availabilityMapper;

    @Override
    public AvailabilitySlotDTO createAvailabilitySlot(UUID userId, AvailabilitySlotDTO dto) {
        User user = userRepository.findById(userId).orElseThrow(AvailabilityException::new);
        AvailabilitySlot slot = availabilityRepository.save(availabilityMapper.map(user, dto));
        return availabilityMapper.mapDto(slot);
    }

    @Override
    public List<AvailabilitySlotDTO> getAvailabilitySlots(String userId) {
        User user = userRepository.findById(UUID.fromString(userId)).orElseThrow(AvailabilityException::new);
        List<AvailabilitySlot> availabilitySlots = availabilityRepository.findByUser(user);
        return availabilitySlots.stream().map(availabilityMapper::mapDto).collect(toList());
    }

}

package com.itechartgroup.telemed.availability.service.impl;

import com.itechartgroup.telemed.availability.dto.AvailabilitySlotDTO;
import com.itechartgroup.telemed.availability.entity.AvailabilitySlot;
import com.itechartgroup.telemed.availability.exception.AvailabilityException;
import com.itechartgroup.telemed.availability.repository.AvailabilityRepository;
import com.itechartgroup.telemed.availability.service.AvailabilityService;
import com.itechartgroup.telemed.availability.service.mapper.AvailabilityMapper;
import com.itechartgroup.telemed.security.entity.User;
import com.itechartgroup.telemed.security.repository.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Data
@Service
public class AvailabilityServiceImpl implements AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    private final AvailabilityMapper availabilityMapper;

    @Override
    public List<AvailabilitySlotDTO> createAvailabilitySlot(UUID userId, List<AvailabilitySlotDTO> requestDtos) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AvailabilityException("User not found"));

        List<AvailabilitySlotDTO> dtos = new ArrayList<>();
        for (AvailabilitySlotDTO dto : requestDtos) {
            AvailabilitySlot slot = availabilityRepository.save(availabilityMapper.map(user, dto));
            dtos.add(availabilityMapper.mapDto(slot));
        }
        return dtos;
    }

    @Override
    public void updateAvailabilitySlot(UUID userId, AvailabilitySlotDTO dto) {
        AvailabilitySlot availability = availabilityRepository.findById(UUID.fromString(dto.getId()))
                .orElseThrow(() -> new AvailabilityException("Availability with id " + dto.getId() + " not found"));
        availabilityMapper.update(availability, dto);
        availabilityRepository.save(availability);
    }

    @Override
    public void deleteAvailabilitySlot(UUID userId, AvailabilitySlotDTO dto) {
        AvailabilitySlot availability = availabilityRepository.findById(UUID.fromString(dto.getId()))
                .orElseThrow(() -> new AvailabilityException("Availability with id " + dto.getId() + " not found"));
        availabilityRepository.delete(availability);
    }

    @Override
    public List<AvailabilitySlotDTO> getAvailabilitySlots(String userId) {
        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new AvailabilityException("User not found"));
        List<AvailabilitySlot> availabilitySlots = availabilityRepository.findByUser(user);
        return availabilitySlots.stream().map(availabilityMapper::mapDto).collect(toList());
    }

}

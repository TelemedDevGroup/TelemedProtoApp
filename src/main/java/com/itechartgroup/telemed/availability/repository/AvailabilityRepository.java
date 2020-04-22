package com.itechartgroup.telemed.availability.repository;

import com.itechartgroup.telemed.availability.entity.AvailabilitySlot;
import com.itechartgroup.telemed.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AvailabilityRepository extends JpaRepository<AvailabilitySlot, UUID> {

    List<AvailabilitySlot> findByUser(User user);

}

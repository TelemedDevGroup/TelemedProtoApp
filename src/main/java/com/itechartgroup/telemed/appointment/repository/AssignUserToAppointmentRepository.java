package com.itechartgroup.telemed.appointment.repository;

import com.itechartgroup.telemed.appointment.entity.AssignUserToAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;
import java.util.UUID;

public interface AssignUserToAppointmentRepository extends JpaRepository<AssignUserToAppointment, UUID> {

    @Query(value =
            "DELETE FROM assign_user_to_appointment au " +
            "WHERE au.user_id IN :userIds AND " +
            "au.appointment_id = :appointmentId", nativeQuery = true)
    void removeParticipants(@Param("userIds") Set<UUID> uuid, @Param("appointmentId") UUID appointmentId);
}

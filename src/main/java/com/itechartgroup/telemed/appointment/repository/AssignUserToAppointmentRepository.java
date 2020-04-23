package com.itechartgroup.telemed.appointment.repository;

import com.itechartgroup.telemed.appointment.entity.AssignUserToAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;
import java.util.UUID;

public interface AssignUserToAppointmentRepository extends JpaRepository<AssignUserToAppointment, UUID> {

    @Modifying
    @Query(value =
            "DELETE FROM assign_user_to_appointment " +
            "WHERE appointment_id = :appointmentId AND " +
            "user_id IN :userIds", nativeQuery = true)
    void removeParticipants(@Param("appointmentId") UUID appointmentId, @Param("userIds") Set<UUID> uuid);

    void removeAllByAppointmentId(UUID appointmentId);
}

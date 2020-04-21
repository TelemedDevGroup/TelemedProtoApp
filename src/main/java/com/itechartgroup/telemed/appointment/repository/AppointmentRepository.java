package com.itechartgroup.telemed.appointment.repository;

import com.itechartgroup.telemed.appointment.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    @Query(value =
            "SELECT a.* FROM appointment a " +
            "JOIN assign_user_to_appointment au ON a.appointment_id = au.appointment_id " +
            "WHERE au.user_id = :userId", nativeQuery = true)
    Collection<Appointment> findByParticipants(@Param("userId") UUID uuid);

    @Query(value =
            "SELECT a.* FROM appointment a " +
            "JOIN assign_user_to_appointment au ON a.appointment_id = au.appointment_id " +
            "WHERE au.user_id = :userId AND " +
            "a.start_timestamp >= :startDate AND " +
            "a.end_timestamp <= :endDate", nativeQuery = true)
    Collection<Appointment> getByDateRange(
            @Param("userId") UUID uuid,
            @Param("startDate") ZonedDateTime startDate,
            @Param("endDate") ZonedDateTime endDate);


}

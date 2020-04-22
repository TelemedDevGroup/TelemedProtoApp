package com.itechartgroup.telemed.appointment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.itechartgroup.telemed.security.dto.UserDTO;
import com.itechartgroup.telemed.video.entity.VideoRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO implements Comparable<AppointmentDTO> {

    private static final Comparator<AppointmentDTO> COMPARATOR =
            Comparator.comparing(AppointmentDTO::getId);

    private UUID id;
    private String subject;
    private ZonedDateTime startTimestamp;
    private ZonedDateTime endTimestamp;
    private String location;
    private String description;
    private VideoRoom videoRoom;
    private boolean isAllDay;
    @JsonProperty("RecurrenceRule")
    private String recurrenceRule;
    private UUID ownerId;
    private Set<UUID> participantIds;
    private Set<UserDTO> participants;

    @Override
    public int compareTo(final AppointmentDTO other) {
        return COMPARATOR.compare(this, other);
    }
}
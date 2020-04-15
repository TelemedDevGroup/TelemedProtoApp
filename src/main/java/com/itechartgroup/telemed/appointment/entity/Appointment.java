package com.itechartgroup.telemed.appointment.entity;

import com.itechartgroup.telemed.security.entity.User;
import com.itechartgroup.telemed.utils.UUIDConverter;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "appointment")
@Data
public class Appointment {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "appointment_id")
    private UUID id;

    @Column(nullable = false)
    private String subject;

    @Column(name = "start_timestamp", nullable = false)
    private LocalDateTime startTimestamp;

    @Column(name = "end_timestamp", nullable = false)
    private LocalDateTime endTimestamp;

    private String location;

    private String description;

    @Column(name = "video_room_id")
    private UUID videoRoomId;

    @Column(name = "is_all_day")
    private boolean isAllDay;

    @Column(name = "recurrence_rule")
    private String recurrenceRule;

    @Column(name = "owner_id", nullable = false)
    private UUID ownerId;

    @Column(name = "creation_timestamp", nullable = false)
    private LocalDateTime creationTimestamp;

    @Column(name = "last_updated_by", nullable = false)
    private UUID lastUpdatedBy;

    @Column(name = "last_update_timestamp", nullable = false)
    private LocalDateTime lastUpdateTimestamp;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "assign_user_to_appointment",
            joinColumns = { @JoinColumn(name = "appointment_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private Set<User> participants = new HashSet<>();
}

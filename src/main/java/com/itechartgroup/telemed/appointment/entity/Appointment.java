package com.itechartgroup.telemed.appointment.entity;

import com.itechartgroup.telemed.security.entity.User;
import com.itechartgroup.telemed.video.entity.VideoRoom;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "appointment")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "appointment_id")
    private UUID id;

    private String subject;
    private ZonedDateTime startTimestamp;
    private ZonedDateTime endTimestamp;
    private String location;
    private String description;
    private UUID videoRoomId;
    private boolean isAllDay;
    private String recurrenceRule;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private ZonedDateTime creationTimestamp;

    @Column(nullable = false, updatable = false)
    @CreatedBy
    private UUID ownerId;

    @LastModifiedBy
    private UUID lastUpdatedBy;

    @LastModifiedDate
    private ZonedDateTime lastUpdateTimestamp;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "assign_user_to_appointment",
            joinColumns = { @JoinColumn(name = "appointment_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private Set<User> participants = new HashSet<>();

    @Transient
    private VideoRoom videoRoom;
}

package com.itechartgroup.telemed.availability.entity;

import com.itechartgroup.telemed.security.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class AvailabilitySlot {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String subject;

    @Column(name = "start_timestamp", nullable = false)
    private ZonedDateTime start;

    @Column(name = "end_timestamp", nullable = false)
    private ZonedDateTime end;

    private String recurrenceRule;

}

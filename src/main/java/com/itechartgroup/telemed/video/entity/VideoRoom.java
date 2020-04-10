package com.itechartgroup.telemed.video.entity;

import com.itechartgroup.telemed.chat.entity.converter.UUIDConverter;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
public class VideoRoom {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Convert(converter = UUIDConverter.class)
    private UUID id;

    @ElementCollection
    @CollectionTable(joinColumns = @JoinColumn(name = "video_room_id"))
    @Column(name = "user_id")
    private Set<Long> participants;

    @CreatedDate
    private LocalDateTime created;

}
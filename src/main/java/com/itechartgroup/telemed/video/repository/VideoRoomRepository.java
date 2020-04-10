package com.itechartgroup.telemed.video.repository;

import com.itechartgroup.telemed.video.entity.VideoRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VideoRoomRepository extends JpaRepository<VideoRoom, UUID> {
}

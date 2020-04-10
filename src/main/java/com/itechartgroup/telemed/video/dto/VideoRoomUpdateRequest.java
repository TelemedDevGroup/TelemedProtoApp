package com.itechartgroup.telemed.video.dto;

import lombok.Data;

import java.util.Set;

@Data
public class VideoRoomUpdateRequest {

    private final String roomId;
    private final boolean finished;

}

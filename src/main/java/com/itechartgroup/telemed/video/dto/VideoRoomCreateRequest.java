package com.itechartgroup.telemed.video.dto;

import lombok.Data;

import java.util.Set;

@Data
public class VideoRoomCreateRequest {

    private final Set<Long> calleeIds;

}

package com.itechartgroup.telemed.appointment.factory;

import com.itechartgroup.telemed.appointment.dto.AppointmentEditParamsDTO;
import com.itechartgroup.telemed.appointment.exception.AppointmentEditException;

public class AppointmentEditFactory {

    public static AppointmentEditType defineAppointmentEditType(AppointmentEditParamsDTO dto) {
        if (dto.getAdded() != null && !dto.getAdded().isEmpty()) {
            return AppointmentEditType.CREATE;
        } else if (dto.getChanged() != null && !dto.getChanged().isEmpty()) {
            return AppointmentEditType.UPDATE;
        } else if (dto.getDeleted() != null && !dto.getDeleted().isEmpty()) {
            return AppointmentEditType.DELETE;
        }else {
            throw new AppointmentEditException("Requested appointment edit type is not supported");
        }
    }
}

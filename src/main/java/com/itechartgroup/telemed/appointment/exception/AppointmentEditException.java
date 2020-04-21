package com.itechartgroup.telemed.appointment.exception;

public class AppointmentEditException extends RuntimeException {

    public AppointmentEditException(String message) {
        super(message);
    }

    public AppointmentEditException(String message, Throwable cause) {
        super(message, cause);
    }
}

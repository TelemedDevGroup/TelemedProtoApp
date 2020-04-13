package com.itechartgroup.telemed.utils;

import lombok.experimental.UtilityClass;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

/**
 * @author s.vareyko
 * @since 07.04.2020
 */
@UtilityClass
public class DateTimeUtils {

    public static LocalDateTime convertToDateTime(final long stamp) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(stamp), TimeZone.getDefault().toZoneId());
    }
}

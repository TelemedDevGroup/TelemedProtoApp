package com.itechartgroup.telemed.chat.constant;

/**
 * @author s.vareyko
 * @since 07.04.2020
 */
public interface ChatConstants {

    String SESSION_ATTR_LAST_FETCH = "LAST_MESSAGES_FETCH";
    long POLLING_SLEEP_STEP = 10L;
    long UNREAD_INC_SIZE = 1L;
    long UNREAD_NO_MESSAGES = 0L;
    int MESSAGE_PREVIEW_MAX_SIZE = 150;
    String MESSAGE_PREVIEW_POSTFIX = "...";
}

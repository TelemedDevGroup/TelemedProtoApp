--liquibase formatted sql
--changeset s.vareyko:04.08.2020-Chat_Room_Schema.sql

CREATE TABLE chat_room_participant
(
    chat_room_id BINARY(16)                           NOT NULL,
    user_id      BIGINT(20) DEFAULT 0                 NOT NULL,
    unread_count BIGINT(20) DEFAULT 0                 NOT NULL,
    created      DATETIME   DEFAULT CURRENT_TIMESTAMP NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

ALTER TABLE chat_room_participant
    ADD CONSTRAINT chat_room_participant_pk
        PRIMARY KEY (chat_room_id, user_id);

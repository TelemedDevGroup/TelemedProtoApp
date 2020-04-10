--liquibase formatted sql
--changeset s.vareyko:04.08.2020-Chat_Message_Schema.sql

CREATE TABLE chat_room (
	id BINARY(16) NOT NULL,
	message_count BIGINT(20) DEFAULT 0 NOT NULL,
	created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT chat_room_pk
		PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

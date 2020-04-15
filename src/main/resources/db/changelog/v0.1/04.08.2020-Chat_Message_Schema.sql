--liquibase formatted sql
--changeset s.vareyko:04.08.2020-Chat_Message_Schema.sql

CREATE TABLE chat_message
(
	id BINARY(16) NOT NULL,
	room BINARY(16) NOT NULL,
	type VARCHAR(50) NOT NULL,
	source VARCHAR(50) NOT NULL,
	body LONGTEXT NOT NULL,
	author BINARY(16) NOT NULL,
	created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT chat_message_pk
		PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

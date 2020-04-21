--liquibase formatted sql
--changeset hlebstraltsou:04.14.2020-Calendar_Schema.sql
CREATE TABLE appointment (
  appointment_id BINARY(16) NOT NULL,
  `subject` VARCHAR(256) NOT NULL,
  start_timestamp DATETIME NOT NULL,
  end_timestamp DATETIME NOT NULL,
  location VARCHAR(256),
  description VARCHAR(1256),
  video_room_id BINARY(16),
  is_all_day BOOLEAN DEFAULT 0,
  recurrence_rule VARCHAR(512),
  owner_id BINARY(16) NOT NULL,
  creation_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_update_timestamp DATETIME,
  last_updated_by BINARY(16),
  CONSTRAINT appointment_pk
    PRIMARY KEY (appointment_id),
  FOREIGN KEY (video_room_id) REFERENCES video_room(id),
  FOREIGN KEY (owner_id) REFERENCES `user`(user_id),
  FOREIGN KEY (last_updated_by) REFERENCES `user`(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE assign_user_to_appointment (
  id BINARY(16) NOT NULL,
  appointment_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  `status` ENUM('REQUESTED', 'APPROVED', 'CANCELLED'),
  CONSTRAINT assign_user_to_appointment_pk
    PRIMARY KEY (id),
  FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE availability_slot (
	availability_slot_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  start_timestamp DATETIME NOT NULL,
  end_timestamp DATETIME NOT NULL,
  recurrence_rule VARCHAR(512),
  CONSTRAINT availability_slot_pk
    PRIMARY KEY (availability_slot_id),
  FOREIGN KEY (user_id) REFERENCES `user`(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
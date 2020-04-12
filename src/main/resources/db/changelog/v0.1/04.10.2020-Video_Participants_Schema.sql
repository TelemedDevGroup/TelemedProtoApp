CREATE TABLE video_room_participants (
    video_room_id BINARY(16) NOT NULL,
    user_id INT(20) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated DATETIME NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (video_room_id) REFERENCES video_room(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

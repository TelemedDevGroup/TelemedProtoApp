CREATE TABLE video_room (
    id BINARY(16) NOT NULL,
    chat_room_id BINARY(16) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    finished DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (chat_room_id) REFERENCES chat_room(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

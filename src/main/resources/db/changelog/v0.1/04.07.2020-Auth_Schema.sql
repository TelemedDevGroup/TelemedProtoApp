--liquibase formatted sql
--changeset hlebstraltsou:04.07.2020-Auth_Schema
CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(20) UNIQUE NOT NULl
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  user_id INT(20) NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  email_verified BIT(1) NOT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) DEFAULT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_id VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE assign_user_to_role (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    role_id INT,
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(role_id) REFERENCES role(role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--liquibase formatted sql
--changeset hlebstraltsou:04.07.2020-Auth_Test_Data

-- For doctors password: `doctor`
-- For patients password: `patient`
INSERT INTO `user` (`user_id`,`email`,`email_verified`,`image_url`,`name`,`password`,`provider`,`provider_id`)
VALUES
(1,'patient.john@gmail.com',0,NULL,'John W','$2a$10$FDUFhlQSKP.XrppD.KeOFOES3B4C1s7oXBBPv7RuYP06/V0capyYu','LOCAL',NULL),
(2,'patient.pavel@gmail.com',0,NULL,'Pavel I','$2a$10$rAr7PydjynMCG9pipva7JucObz/zOaoPTjsdc0JVzMG3jJP4qWQp.','LOCAL',NULL),
(3,'doctor.sophy@gmail.com',0,NULL,'Sophy M','$2a$10$xRR8jtRVyoeNZjY1G2PNEuxC1FANpe0.y4.c4bByvLK5sffK.W8lq','LOCAL',NULL),
(4,'doctor.aibolit@gmail.com',0,NULL,'Aibolit','$2a$10$D4./B5lu3xUPOnvJvLL/nuBH9WbkGIpQpG0S5ocm/sJ/uwMnqgvf2','LOCAL',NULL);

INSERT INTO role (role_id, role_name) VALUES
(1, 'PATIENT'),
(2, 'DOCTOR');

INSERT INTO assign_user_to_role (user_id, role_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);
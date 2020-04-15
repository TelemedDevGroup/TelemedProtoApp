--liquibase formatted sql
--changeset hlebstraltsou:04.07.2020-Auth_Test_Data

-- For doctors password: `doctor`
-- For patients password: `patient`
INSERT INTO `user` (`user_id`,`email`,`email_verified`,`image_url`,`name`,`password`,`provider`,`provider_id`)
VALUES
(0xA3A1CF0215D9498EF15FCD5F1BFEA82A,'patient.john@gmail.com',0,NULL,'John W','$2a$10$FDUFhlQSKP.XrppD.KeOFOES3B4C1s7oXBBPv7RuYP06/V0capyYu','LOCAL',NULL),
(0x27E2AA1976A1248DB42AED5F7DA5A11B,'patient.pavel@gmail.com',0,NULL,'Pavel I','$2a$10$rAr7PydjynMCG9pipva7JucObz/zOaoPTjsdc0JVzMG3jJP4qWQp.','LOCAL',NULL),
(0xCDDE122517D8518EBA1CEA5F7AF52281,'doctor.sophy@gmail.com',0,NULL,'Sophy M','$2a$10$xRR8jtRVyoeNZjY1G2PNEuxC1FANpe0.y4.c4bByvLK5sffK.W8lq','LOCAL',NULL),
(0xB1D4CA091CDF2481BA41F4DAA7DC156F,'doctor.aibolit@gmail.com',0,NULL,'Aibolit','$2a$10$D4./B5lu3xUPOnvJvLL/nuBH9WbkGIpQpG0S5ocm/sJ/uwMnqgvf2','LOCAL',NULL);

INSERT INTO role (role_id, role_name) VALUES
(1, 'PATIENT'),
(2, 'DOCTOR');

INSERT INTO assign_user_to_role (`id`, user_id, role_id) VALUES
(0xF2ACA10319F94F1EF26FAD1B2BFBB21B, 0xA3A1CF0215D9498EF15FCD5F1BFEA82A, 1),
(0xB1C1EF2BB15D9411BF11A1D5299FE182, 0x27E2AA1976A1248DB42AED5F7DA5A11B, 1),
(0xCCA1E223138BA1E415FCF4509ECEA61A, 0xCDDE122517D8518EBA1CEA5F7AF52281, 2),
(0x10BACF0215D239BEF11BFE5F129FEE2C, 0xB1D4CA091CDF2481BA41F4DAA7DC156F, 2);
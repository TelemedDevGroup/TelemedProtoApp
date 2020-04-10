--liquibase formatted sql
--changeset s.vareyko:04.10.2020-Chat_Test_Data.sql

INSERT INTO telemedicine_demo.chat_room (id, message_count, created, updated) VALUES (0x17D4CF0915D2448EB41FED5F7CF5A88B, 5, '2020-04-09 14:15:32', '2020-04-10 11:46:21');
INSERT INTO telemedicine_demo.chat_room (id, message_count, created, updated) VALUES (0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 0, '2020-04-09 14:14:10', '2020-04-09 14:14:10');
INSERT INTO telemedicine_demo.chat_room (id, message_count, created, updated) VALUES (0x44C587E13F5E433D8802971E4E9A7885, 0, '2020-04-09 14:09:32', '2020-04-09 14:09:32');

INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x17D4CF0915D2448EB41FED5F7CF5A88B, 1, '2020-04-09 17:15:32');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x17D4CF0915D2448EB41FED5F7CF5A88B, 2, '2020-04-09 17:15:32');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x17D4CF0915D2448EB41FED5F7CF5A88B, 4, '2020-04-09 17:15:32');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 2, '2020-04-09 17:14:09');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 4, '2020-04-09 17:14:09');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x44C587E13F5E433D8802971E4E9A7885, 1, '2020-04-09 17:09:32');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x44C587E13F5E433D8802971E4E9A7885, 3, '2020-04-09 17:09:32');
INSERT INTO telemedicine_demo.chat_room_participants (chat_room_id, user_id, created) VALUES (0x44C587E13F5E433D8802971E4E9A7885, 4, '2020-04-09 17:09:32');

INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x31562F9EC5EB45F297B00FC60DD49DEF, 0x17D4CF0915D2448EB41FED5F7CF5A88B, 'TEXT', 'USER', 'Hi, I have a headache', 1, '2020-04-10 04:57:34', '2020-04-10 04:57:37');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x390356DA2C2C4D51ACD44FA93D486723, 0x17D4CF0915D2448EB41FED5F7CF5A88B, 'TEXT', 'USER', 'Hello, I can''t help you, looks like you''re gonna die, so please give me your money, as you don''t need it anymore', 3, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x8957B6CC88584AF3A73343C8B4729B58, 0x17D4CF0915D2448EB41FED5F7CF5A88B, 'TEXT', 'USER', 'Okay, take it, thanks for this discussion', 1, '2020-04-10 06:11:34', '2020-04-10 06:11:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x956DC78AEAFA4B85A54E25BDA9CA419E, 0x17D4CF0915D2448EB41FED5F7CF5A88B, 'TEXT', 'USER', 'You''re welcome', 3, '2020-04-10 05:00:01', '2020-04-10 05:00:01');

INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x31562F9EC5EB45F297B00FC60DD49DEF, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'I have a coronavirus', 2, '2020-04-10 04:57:34', '2020-04-10 04:57:37');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x390356DA2C2C4D51ACD44FA93D486723, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Congratulations, you''re will die!', 4, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x8957B6CC88584AF3A73343C8B4729B58, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'What I can do?', 2, '2020-04-10 06:11:34', '2020-04-10 06:11:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x956DC78AEAFA4B85A54E25BDA9CA419E, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'You can do everything, at first meet your enemies and say to them bye bye', 4, '2020-04-10 05:00:01', '2020-04-10 05:00:01');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x8957B6CC88584AF3A73343C8B4729B58, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Okay, thanks!', 2, '2020-04-10 06:11:34', '2020-04-10 06:11:34');

INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x31562F9EC5EB45F297B00FC60DD49DEF, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Hi guys', 1, '2020-04-10 04:57:34', '2020-04-10 04:57:37');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x390356DA2C2C4D51ACD44FA93D486723, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Hello', 3, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x390356DA2C2C4D51ACD44FA93D486723, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Good morning', 4, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x8957B6CC88584AF3A73343C8B4729B58, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Its just a test', 1, '2020-04-10 06:11:34', '2020-04-10 06:11:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated) VALUES (0x956DC78AEAFA4B85A54E25BDA9CA419E, 0x0B3A56CEA7DC4CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Looks like its works', 3, '2020-04-10 05:00:01', '2020-04-10 05:00:01');
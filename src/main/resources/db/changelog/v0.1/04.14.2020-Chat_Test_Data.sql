--liquibase formatted sql
--changeset s.vareyko:04.14.2020-Chat_Test_Data.sql

INSERT INTO telemedicine_demo.chat_room (id, message_count, created, updated)
VALUES (0x17D4CF0915D1448EB41FED5F7CF5A88B, 5, '2020-04-09 14:15:32', '2020-04-10 11:46:21');
INSERT INTO telemedicine_demo.chat_room (id, message_count, created, updated)
VALUES (0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 0, '2020-04-09 14:14:10', '2020-04-09 14:14:10');
INSERT INTO telemedicine_demo.chat_room (id, message_count, created, updated)
VALUES (0x44C587E13F51433D8802971E4E9A7885, 0, '2020-04-09 14:19:32', '2020-04-09 14:19:32');

INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x17D4CF0915D1448EB41FED5F7CF5A88B, 0xA3A1CF0215D9498EF15FCD5F1BFEA82A, 0, '2020-04-09 17:15:32');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x17D4CF0915D1448EB41FED5F7CF5A88B, 0x27E2AA1976A1248DB42AED5F7DA5A11B, 0, '2020-04-09 17:15:32');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x17D4CF0915D1448EB41FED5F7CF5A88B, 0xB1D4CA091CDF2481BA41F4DAA7DC156F, 0, '2020-04-09 17:15:32');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 0x27E2AA1976A1248DB42AED5F7DA5A11B, 0, '2020-04-09 17:14:09');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 0xB1D4CA091CDF2481BA41F4DAA7DC156F, 0, '2020-04-09 17:14:09');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x44C587E13F51433D8802971E4E9A7885, 0xA3A1CF0215D9498EF15FCD5F1BFEA82A, 0, '2020-04-09 17:19:32');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x44C587E13F51433D8802971E4E9A7885, 0xCDDE122517D8518EBA1CEA5F7AF52281, 0, '2020-04-09 17:19:32');
INSERT INTO telemedicine_demo.chat_room_participant (chat_room_id, user_id, unread_count, created)
VALUES (0x44C587E13F51433D8802971E4E9A7885, 0xB1D4CA091CDF2481BA41F4DAA7DC156F, 0, '2020-04-09 17:19:32');

INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x3156219EC5EB45F297B00FC60DD49DEF, 0x17D4CF0915D1448EB41FED5F7CF5A88B, 'TEXT', 'USER', 'Hi, I have a headache',
        0xA3A1CF0215D9498EF15FCD5F1BFEA82A, '2020-04-10 04:57:34', '2020-04-10 04:57:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x390351DA2C2C4D51ACD44FA93D486723, 0x17D4CF0915D1448EB41FED5F7CF5A88B, 'TEXT', 'USER',
        'Hello, I can''t help you, looks like you''re gonna die, so please give me your money, as you don''t need it anymore',
        0xCDDE122517D8518EBA1CEA5F7AF52281, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x8957B1CC88584AF3A73343C8B4729B58, 0x17D4CF0915D1448EB41FED5F7CF5A88B, 'TEXT', 'USER',
        'Okay, take it, thanks for this discussion', 0xA3A1CF0215D9498EF15FCD5F1BFEA82A, '2020-04-10 06:11:34', '2020-04-10 06:11:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x956DC18AEAFA4B85A54E25BDA9CA419E, 0x17D4CF0915D1448EB41FED5F7CF5A88B, 'TEXT', 'USER', 'You''re welcome',
        0xCDDE122517D8518EBA1CEA5F7AF52281, '2020-04-10 07:05:01', '2020-04-10 07:05:01');

INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x3156219EC5EB45F297B00FC60DD48DEF, 0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'I have a coronavirus',
        0x27E2AA1976A1248DB42AED5F7DA5A11B, '2020-04-10 04:57:34', '2020-04-10 04:57:37');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x390351DA2C2C4D51ACD44FA93D487723, 0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 'TEXT', 'USER',
        'Congratulations, you''re will die!', 0xB1D4CA091CDF2481BA41F4DAA7DC156F, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x8957B1CC88584AF3A73343C8B4728B58, 0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'What I can do?',
        0x27E2AA1976A1248DB42AED5F7DA5A11B, '2020-04-10 06:11:34', '2020-04-10 06:11:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x956DC18AEAFA4B86A54E25BDA9CA419E, 0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 'TEXT', 'USER',
        'You can do everything, at first meet your enemies and say to them bye bye', 0xB1D4CA091CDF2481BA41F4DAA7DC156F,
        '2020-04-10 07:00:01', '2020-04-10 07:00:01');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x8957B1CC88584AF3A73343C8B4739B58, 0x0B3A56CEA7D14CFF9588697DB5FF6FE4, 'TEXT', 'USER', 'Okay, thanks!',
        0x27E2AA1976A1248DB42AED5F7DA5A11B, '2020-04-10 08:11:34', '2020-04-10 08:11:34');

INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x3156219EC5EB45F297B00FC60DD47DEF, 0x44C587E13F51433D8802971E4E9A7885, 'TEXT', 'USER', 'Hi guys',
        0xA3A1CF0215D9498EF15FCD5F1BFEA82A, '2020-04-10 04:57:34', '2020-04-10 04:57:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x390351DA2C2C4D51ACD44FA93D488723, 0x44C587E13F51433D8802971E4E9A7885, 'TEXT', 'USER', 'Hello',
        0xCDDE122517D8518EBA1CEA5F7AF52281, '2020-04-10 05:02:35', '2020-04-10 05:02:35');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x390351DA2C2C4D51ACD42FA93D486723, 0x44C587E13F51433D8802971E4E9A7885, 'TEXT', 'USER', 'Good morning',
        0xB1D4CA091CDF2481BA41F4DAA7DC156F, '2020-04-10 05:02:38', '2020-04-10 05:02:38');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x8957B1CC88584AF3A73343C8B4727B58, 0x44C587E13F51433D8802971E4E9A7885, 'TEXT', 'USER', 'Its just a test',
        0xA3A1CF0215D9498EF15FCD5F1BFEA82A, '2020-04-10 06:11:34', '2020-04-10 06:11:34');
INSERT INTO telemedicine_demo.chat_message (id, room, type, source, body, author, created, updated)
VALUES (0x956DC13AEAFA4B85A54E25BDA9CA429E, 0x44C587E13F51433D8802971E4E9A7885, 'TEXT', 'USER', 'Looks like its works',
        0xCDDE122517D8518EBA1CEA5F7AF52281, '2020-04-10 07:00:01', '2020-04-10 07:00:01');
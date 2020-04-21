import {API_BASE_URL} from "../constants";
import {request} from "./Request";

export function createVideoRoom(chatRoomId) {
  return request({
    url: API_BASE_URL + '/api/video/room',
    method: 'POST',
    body: JSON.stringify({roomId: chatRoomId})
  });
}

export function getAllRooms() {
  return request({
    url: API_BASE_URL + '/api/chat/room',
    method: 'GET'
  });
}

export function poll() {
  return request({
    url: API_BASE_URL + '/api/chat/poll',
    method: 'GET'
  });
}

export function getRoom(roomId) {
  return request({
    url: API_BASE_URL + '/api/chat/room/' + roomId,
    method: 'GET'
  });
}

export function sendMessageRoom(messageData) {
  return request({
    url: API_BASE_URL + "/api/chat/message",
    method: "POST",
    body: JSON.stringify(messageData)
  });
}

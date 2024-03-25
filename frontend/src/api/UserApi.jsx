import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();

export function loginUser(user) {
  return fetchWrapper.post("/login", user);
}
export function registerUser(user) {
  return fetchWrapper.post("/register", user);
}
export function getUser() {
  return fetchWrapper.get("/user");
}
export function getUserDetail(id) {
  return fetchWrapper.get(`/user/${id}`);
}
export function saveUserDetail(user) {
  return fetchWrapper.post("/user/update", user);
}
export function logoutUser() {
  return fetchWrapper.post("/logout");
}
export function getUsers() {
  return fetchWrapper.get("/users/");
}
export function myMessages(id) {
  return fetchWrapper.get(`/my-messages/${id}/`);
}
export function getMessages(user, other) {
  return fetchWrapper.get(`/get-messages/${user}/${other}`);
}

export function sendMessages(data) {
  return fetchWrapper.post("/send-messages", data);
}

export function markRead(id) {
  return fetchWrapper.post(`/messages/mark-read/${id}/`);
}

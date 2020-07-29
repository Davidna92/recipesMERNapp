import { myUrl } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const userToken = "token";

export function logout() {
  localStorage.removeItem(userToken);
}

export function addFavs(id) {
  return http.put(`${myUrl}/users/recipes/${id}`);
}

export function removeFav(id) {
  return http.put(`${myUrl}/users/recipes/remove/${id}`);
}

export function getThisUser() {
  try {
    const jwt = localStorage.getItem(userToken);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getUser(id) {
  return http.get(`${myUrl}/users/${id}`);
}

export async function login(email, password) {
  const { data } = await http.post(`${myUrl}/auth`, { email, password });
  localStorage.setItem(userToken, data.token);
}

export default { login, getThisUser, logout, getUser, addFavs, removeFav };

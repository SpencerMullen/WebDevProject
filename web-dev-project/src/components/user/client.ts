/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BACKEND_API = "http://localhost:8081/users";
const request = axios.create({
  withCredentials: true,
});

export const updateUser = async (user: any) => {
  const response = await request.put(`${BACKEND_API}/update/${user._id}`, user);
  return response.data;
};

export const findUserById = async (id: any) => {
  const response = await request.get(`${BACKEND_API}/${id}`);
  return response.data;
};

export const deleteUser = async (id: any) => {
  const response = await request.delete(`${BACKEND_API}/${id}`);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await request.post(`${BACKEND_API}/signin`, credentials);
  return response.data;
};

export const signup = async (userData: any) => {
  const response = await request.post(`${BACKEND_API}/signup`, userData);
  return response.data;
};

export const signout = async () => {
  const response = await request.post(`${BACKEND_API}/signout`);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await request.post(`${BACKEND_API}/account`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await request.post(`${BACKEND_API}/current`);
  return response.data;
};

export const getRecommendations = async () => {
  const response = await request.post(`http://localhost:8081/movies/recommendations`);
  return response.data;
}
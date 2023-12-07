/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BACKEND_API = "http://localhost:8081/users";
const request = axios.create({
    withCredentials: true,
});

//TODO: need to implement backend
export const signin = async (credentials) => {
  const response = await request.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

//TODO: need to implement backend
export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};

//TODO: hook up to backend and implement in profile section
export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

//TODO: replace current createUser function in signup page with this one
// export const createUser = async (user) => {
//   const response = await request.post(`${USERS_API}`, user);
//   return response.data;
// };

//TODO: need to evaluate if needed for this project... probably do for updating a user?
export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

//Could use it in profile section... or for admins to delete other users....? might need a table view or something to delete users
export const deleteUser = async (user) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};

// createUser vs signup? 
export const signup = async (userData: any) => {
  const response = await request.post(
    `${BACKEND_API}/signup`, userData);
    console.log("done in the frontend")
  return response.data;
};

// need to implement it into profile section
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};
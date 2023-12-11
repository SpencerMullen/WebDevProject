/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BACKEND_API = "http://localhost:8081/users";
const request = axios.create({
  withCredentials: true,
});

//TODO: hook up to backend and implement in profile section
export const updateUser = async (user: any) => {
  const response = await request.put(`${BACKEND_API}/update/${user._id}`, user);
  console.log("FRONTEND UPDATING USER: ", response.data);
  return response.data;
};

//TODO: replace current createUser function in signup page with this one
// export const createUser = async (user) => {
//   const response = await request.post(`${USERS_API}`, user);
//   return response.data;
// };

//TODO: need to evaluate if needed for this project... probably do for updating a user?
export const findUserById = async (id: any) => {
  const response = await request.get(`${BACKEND_API}/${id}`);
  console.log("FRONTEND FINDING USER BY ID: ", response.data);
  return response.data;
};

//Could use it in profile section... or for admins to delete other users....? might need a table view or something to delete users
export const deleteUser = async (user: any) => {
  // const response = await request.delete(
  //   `${BACKEND_API}/${user._id}`);
  // return response.data;
};

export const signin = async (credentials: any) => {
  const response = await request.post(`${BACKEND_API}/signin`, credentials);
  console.log("FRONTEND SIGNING IN!!!");
  return response.data;
};

// createUser vs signup? 
export const signup = async (userData: any) => {
  const response = await request.post(`${BACKEND_API}/signup`, userData);
  console.log("FRONTEND SIGNING UP!!!");
  return response.data;
};

// need to implement it into profile section
export const signout = async () => {
  const response = await request.post(`${BACKEND_API}/signout`);
  console.log("FRONTEND SIGNING OUT!!!");
  return response.data;
};

// get user info
export const getUserInfo = async () => {
  const response = await request.post(`${BACKEND_API}/account`);
  console.log("FRONTEND GETTING USER INFO!!!");
  return response.data;
};

// get cyrrent user info
export const getCurrentUser = async () => {
  const response = await request.post(`${BACKEND_API}/current`);
  console.log("FRONTEND GETTING CURRENT USER INFO!!!");
  return response.data;
};
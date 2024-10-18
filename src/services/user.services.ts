import { User } from "../types/types";
import axiosInstance from "./axios";

export const checkEmail = async (email: string) => {
  const response = await axiosInstance.post("/users/check-email", { email });
  console.log("respons sending..", response);
  return response.data;
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  role: string;
  userImageUrl: string;
}) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/users");
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/users/remove/${userId}`);
  return response.data;
};

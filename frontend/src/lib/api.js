import axiosInstance from "./axios.js";
import { API_PATHS } from "./apiPaths.js";
import axios from "axios";

export const signup = async (signUpData) => {
  const response = await axiosInstance.post(API_PATHS.AUTH.SIGN_UP, {
    fullName: signUpData.fullName,
    email: signUpData.email,
    password: signUpData.password,
  });
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.AUTH.ME);
    return response.data;
  } catch (error) {
    console.log("Error in getting the User: ", error);
    return null;
  }
};

export const completeOnboarding = async (formData) => {
  const response = await axiosInstance.post(API_PATHS.AUTH.ONBOARD, formData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
    email: loginData.email,
    password: loginData.password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get(API_PATHS.USER.USER_FRIENDS);
  return response.data.friends;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get(API_PATHS.USER.RECOMMENDED_USERS);
  return response.data.recommendedUsers;
};

export const getOutgoingFriendRequests = async () => {
  const response = await axiosInstance.get(
    API_PATHS.USER.OUTGOING_FRIEND_REQUESTS
  );
  return response.data.outgoingFriendRequests;
};

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(
    API_PATHS.USER.SEND_FRIEND_REQUEST(userId)
  );
  return response.data.friendRequest;
};

export const getFriendRequests = async () => {
  const response = await axiosInstance.get(API_PATHS.USER.FRIEND_REQUESTS);
  return response.data;
};

export const acceptFriendRequest = async (userId) => {
  const response = await axiosInstance.post(
    API_PATHS.USER.ACCEPT_FRIEND_REQUEST(userId)
  );
  return response.data;
};

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/api/chat/token");
  return response.data.token;
};

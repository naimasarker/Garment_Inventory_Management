import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth';

export const registerUser = async (data) =>
  axios.post(`${BASE_URL}/register`, data, { withCredentials: true });

export const loginUser = async (data) =>
  axios.post(`${BASE_URL}/login`, data, { withCredentials: true });

export const verifyMail = async (data) =>
  axios.post(`${BASE_URL}/verify`, data, { withCredentials: true });

export const logoutUser = async () =>
  axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
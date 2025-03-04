import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_KEY,
  withCredentials: true, // This is crucial for cookies to be sent with requests
});

export default api;

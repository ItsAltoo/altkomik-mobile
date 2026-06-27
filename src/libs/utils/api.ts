import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api` || "http://localhost:3000",
  headers: {
    "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
  },
});

export default api;

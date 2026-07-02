import axios from "axios"

// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api` || "http://localhost:3000",
  headers: {
    "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
  },
})

export default api

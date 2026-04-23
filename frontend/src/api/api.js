import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-ps5d.onrender.com/api",
});

export default API;
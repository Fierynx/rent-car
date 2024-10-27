import axios from "axios";
import { API_URL } from "../lib/config";

export const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
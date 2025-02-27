import axios, { AxiosError } from "axios";
import { API_URL, TOKEN } from "./constants";

const httpRequest = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `token ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `token ${TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error as AxiosError);
    } else {
      return Promise.reject(error as Error);
    }
  }
);

export default httpRequest;

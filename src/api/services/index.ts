"use client";
import axios from "axios";
import { AuthService } from "./auth.service";
import { ProductService } from "./product.service";
import { SelectProductService } from "./selectProduct.service";

let tokens = {
  accessToken: "",
  refreshToken: "",
};

export const setToken = (token: {
  accessToken: string;
  refreshToken?: string;
}) => {
  tokens = {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken || "",
  };
};
console.log(process.env.NEXT_PUBLIC_BASE_URL);
const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiServer.interceptors.request.use(async (config) => {
  if (tokens.accessToken) {
    config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

apiServer.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (!error.response.data.refreshToken) {
        console.log("refresh token not found");
        return Promise.reject(error);
      }

      try {
        const response = await apiServer.post(
          "/api/auth/refresh",
          JSON.stringify({ refreshToken: error.response.data.refreshToken })
        );
        if (response.status === 201) {
          setToken(response.data);
          return apiServer.request(error.config);
        } else {
          console.log("refresh token error");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
);

export const authService = new AuthService(apiServer);
export const productService = new ProductService(apiServer);
export const selectProductService = new SelectProductService(apiServer);

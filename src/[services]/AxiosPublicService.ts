import axios, { type AxiosInstance, type AxiosResponse } from "axios";

import { env } from "@/config/env";
import Logger from "@/utils/logger";

export class AxiosPublicService {
  private static _instance: AxiosInstance;

  constructor() {
    AxiosPublicService._instance = axios.create({
      baseURL: env.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    AxiosPublicService.configureInterceptors();
  }

  public static getInstance(): AxiosInstance {
    if (!AxiosPublicService._instance) {
      new AxiosPublicService();
    }
    return AxiosPublicService._instance;
  }

  private static configureInterceptors() {
    AxiosPublicService._instance.interceptors.request.use(
      (config) => {
        Logger.request({
          url: `${config.baseURL}${config.url}`,
          method: config.method,
          headers: config.headers,
          params: config.params,
          requestBody: config.data,
        });
        return config;
      },
      (error) => {
        Logger.responseError({
          url: `${error.config?.baseURL}${error.config?.url}`,
          method: error.config?.method,
          headers: error.config?.headers,
          requestBody: error.config?.data,
          responseBody: error.response?.data,
          status_code: error.response?.status,
        });
        return Promise.reject(error);
      },
    );

    AxiosPublicService._instance.interceptors.response.use(
      (response: AxiosResponse) => {
        Logger.responseSuccess({
          url: `${response.config.baseURL}${response.config.url}`,
          method: response.config.method,
          headers: response.config.headers,
          params: response.config.params,
          requestBody: response.config.data,
          responseBody: response.data,
        });
        return response;
      },
      (error) => {
        Logger.responseError({
          url: `${error.config?.baseURL}${error.config?.url}`,
          method: error.config?.method,
          headers: error.config?.headers,
          requestBody: error.config?.data,
          responseBody: error.response?.data,
          status_code: error.response?.status,
        });
        return Promise.reject(error);
      },
    );
  }
}

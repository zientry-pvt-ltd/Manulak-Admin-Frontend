import type { AxiosInstance } from "axios";
import axios from "axios";

import { env } from "@/config/env";
import { store } from "@/store";
import { refreshAccessToken } from "@/store/slices/authSlice";
import Logger from "@/utils/Logger";

export class AxiosPrivateService {
  private static _instance: AxiosInstance;
  private static _accessToken: string | null;

  constructor() {
    AxiosPrivateService._instance = axios.create({
      baseURL: env.API_URL,
    });
    AxiosPrivateService._accessToken = store.getState().auth.refreshToken;
    AxiosPrivateService.configureInterceptors();
  }

  public static getInstance(): AxiosInstance {
    if (!AxiosPrivateService._instance) {
      new AxiosPrivateService();
    }
    return AxiosPrivateService._instance;
  }

  public static updateToken(token: string) {
    AxiosPrivateService._accessToken = token;
  }

  private static configureInterceptors() {
    AxiosPrivateService._instance.interceptors.request.use(
      (config) => {
        if (AxiosPrivateService._accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${AxiosPrivateService._accessToken}`;
        }
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

    AxiosPrivateService._instance.interceptors.response.use(
      (response) => {
        Logger.responseSuccess({
          url: response.config.url || "",
          method: response.config.method,
          headers: response.config.headers,
          params: response.config.params,
          requestBody: response.config.data,
          responseBody: response.data,
        });
        return response.data;
      },
      async (error) => {
        Logger.responseError({
          url: `${error.config?.baseURL}${error.config?.url}`,
          method: error.config?.method,
          headers: error.config?.headers,
          requestBody: error.config?.data,
          responseBody: error.response?.data,
          status_code: error.response?.status,
        });

        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const accessTokenResponse =
              await store.dispatch(refreshAccessToken());

            if (refreshAccessToken.fulfilled.match(accessTokenResponse)) {
              const newToken = accessTokenResponse.payload;
              AxiosPrivateService.updateToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return AxiosPrivateService._instance(originalRequest);
            }
          } catch (refreshError) {
            //TODO: implement with real async api
            store.dispatch({ type: "auth/logout" });

            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }
}

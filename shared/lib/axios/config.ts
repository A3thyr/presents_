import axios from "axios";
import handleError from "./handleError";
import { AuthService } from "@/entities/auth";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const axiosService = axios.create({
  baseURL: baseApi,
  withCredentials: true,
});

axios.interceptors.request.use(
  (res) => res,
  (err) => {
    handleError(err);
    return Promise.reject(err);
  }
);

// let isRefreshing = false;
// Массив для хранения очереди ошибок при рефреше токена
// let failedRequestsQueue: Array<{
//   resolve: (token: string) => void;
//   reject: (error: unknown) => void;
// }> = [];

axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      // хэндлер для кейса, если токен уже рефрешится
      // if (isRefreshing) {

      //   return new Promise((resolve, reject) => {
      //     failedRequestsQueue.push({ resolve, reject });
      //   })
      //     .then(() => {
      //       return axiosService(originalRequest);
      //     })
      //     .catch((err) => {
      //       return Promise.reject(err);
      //     });
      // }

      originalRequest._retry = true;
      // isRefreshing = true;

      try {
        const checkResponse = await AuthService.getCheck();

        if (!checkResponse) {
          // рефреш токена, после непрошедшего чека
          const refreshResponse = await AuthService.getRefresh();

          if (refreshResponse) {
            return axiosService(originalRequest);
          } else {
            // Хэндлер при ошибке рефреша токена

            return Promise.reject(error);
          }
        } else {
          return axiosService(originalRequest);
        }
      } catch (refreshError) {
        // failedRequestsQueue.forEach((request) => request.reject(refreshError));
        // failedRequestsQueue = [];

        return Promise.reject(refreshError);
      }
      //  finally {
      //   isRefreshing = false;
      // }
    }

    handleError(error);
    return Promise.reject(error);
  }
);

axiosService.interceptors.request.use(
  (config) => {
    // Получаем tginit данные из localStorage

    const debug = true;

    if (typeof window.Telegram?.WebApp === "undefined" || debug) {
      const tgInitData = process.env.NEXT_PUBLIC_TG;
      config.headers["user"] = tgInitData;
    } else {
      const tgInitData = window.Telegram.WebApp.initData;
      config.headers["user"] = tgInitData;
    }

    return config;
  },
  (err) => {
    handleError(err);
    return Promise.reject(err);
  }
);

export default axiosService;

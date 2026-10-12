import { Status } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";

export class AuthService {
  static async getCheck() {
    return axiosService.get<Status>("/auth/check").then((res) => res.data);
  }
  static async getRefresh() {
    return axiosService.get<Status>("/auth/refresh").then((res) => res.data);
  }
}

import { SpinResult } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";

export class SpinService {
  static async postSpin(id: string, spins: number) {
    return axiosService
      .post<SpinResult[]>(`/spin/${id}`, null, {
        params: {
          spins,
        },
      })
      .then((res) => res.data);
  }

  static async postSpinDemo(id: string, spins: number) {
    return axiosService
      .post<SpinResult[]>(`/spin/demo/${id}`, null, {
        params: {
          spins,
        },
      })
      .then((res) => res.data);
  }
}

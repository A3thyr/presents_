import { Level, Refferal } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";


export class RefferalService {


    static async getRefferals () {
        return axiosService.get<Refferal>("/refferal").then(res => res.data)
    }

    static async getLevels () {
        return axiosService.get<Level[]>("/refferal/levels").then(res => res.data)
    }

    static async getBalance () {
        return axiosService.get("/refferal/balance").then(res => res.data)
    }
}
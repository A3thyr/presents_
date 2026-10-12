import { Inventory, User } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";

export class UserService {
  static async getMe() {
    return axiosService.get<User>("/user").then((res) => res.data);
  }
  static async getInventory() {
    return axiosService
      .get<Inventory>("/user/inventory")
      .then((res) => res.data);
  }
  static async postUserWalletConnect(data: { wallet: string }) {
    return axiosService
      .post("/user/wallet/connect", data)
      .then((res) => res.data);
  }

  static async sentNft(data: { itemId: string }) {
    return axiosService.post("/user/send-nft-gift", data).then(res => res.data)
  }
}

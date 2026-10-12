import { LastItem, SellResponse } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";

export class ItemsService {
  static async getItemsLast(limit?: number) {
    return axiosService
      .get<LastItem[]>(`/items/last`, {
        params: {
          limit,
        },
      })
      .then((res) => res.data);
  }

  static async sellItem(id: string) {
    return axiosService.post(`/items/sell/${id}`).then(res => res.data)
  }

  static async sellAll() {
    return axiosService.post(`/items/sell-all`).then(res => res.data)
  }
}

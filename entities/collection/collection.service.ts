import { Collection, CollectionById } from "@/shared/interface";
import axiosService from "@/shared/lib/axios/config";

export class CollectionService {
  static async getCollections() {
    return axiosService
      .get<Collection[]>("/collection")
      .then((res) => res.data);
  }

  static async getCollectionById(id: string) {
    return axiosService
      .get<CollectionById>(`/collection/${id}`)
      .then((res) => res.data);
  }
}

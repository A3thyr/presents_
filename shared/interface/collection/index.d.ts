export interface CaseItem {
  id: string;
  collection_id: string;
  rare: string;
  drop_rate: number;
  price: number;
  img: string;
  name: string;
  lottie: string;
  type: string;
}

export interface Collection {
  id: string;
  img: string;
  name: string;
  lottie: string;
  price: number;
}

export interface CollectionById {
  id: string;
  img: string;
  name: string;
  price: number;
  items: CaseItem[];
}

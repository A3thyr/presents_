export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface User {
  id: string;
  photo_url: string;
  username: string;
  first_name: string;
  telegram_id: number;
  level: number;
  available_ref_balance: number
  balance: {
    ton: number;
    stars: number;
  };
  wallet: string;
}

export interface Item {
  id: string;
  inventory_id: string;
  name: string;
  img: string;
  rare: string;
  drop_rate: number;
  price: number;
  lottie: string;
  created_at: string;
  type: string;
}
export interface Inventory {
  id: string;
  user_id: string;
  items: Item[];
}

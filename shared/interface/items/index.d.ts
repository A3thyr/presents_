export interface LastItem {
  img: string;
  name: string;
  rare: string;
  price: number;
  lottie: string;
  type: string;
}

export interface NewBalance {
  id: string;
  ton: number;
  stars: number;
  user_id: string;
}
export interface SellResponse {
  success: boolean;
  message: string;
  newBalance: NewBalance;
}

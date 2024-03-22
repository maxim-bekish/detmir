export interface ICard {
  quantity: number;
  createdAt: string;
  product: ICards;
}
export interface ICards {
  category: string;
  description: string;
  id: string;
  picture: string;
  price: number;
  rating: number;
  title: string;
}
export interface ProductInBasket {
  id: string;
  quantity: number;
}

export interface OrdersData {
  data: ICard[][];
  meta: { count: number; total: number; id?: number };
}
export interface ProductsData {
  data: ICards[];
  meta: { count: number; total: number };
}

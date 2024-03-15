export interface ICards {
  category: string;
  description: string;
  id: string;
  picture: string;
  price: number;
  rating: number;
  title: string;
}
export interface ICard  {
  quantity: number;
  createdAt: string;
  product: {
    id: string;
    category: string;
    title: string;
    description: string;
    price: number;
    picture: string;
    rating: number;
  };
}

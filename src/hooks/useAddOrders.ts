import { useTypedSelector } from "./useTypedSelector";

export const useAddOrders = () => {
  const orders = useTypedSelector((state) => state.orders);
  return { orders };
};

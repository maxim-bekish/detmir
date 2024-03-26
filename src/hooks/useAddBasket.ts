import { useTypedSelector } from "./useTypedSelector";

export const useAddBasket = () => {
  const basket = useTypedSelector((state) => state.basket);

  return { basket };
};

import { useTypedSelector } from "./useTypedSelector";

export const useAddBasket = () => {
  const { inBasket } = useTypedSelector((state) => state);
  return { inBasket };
};

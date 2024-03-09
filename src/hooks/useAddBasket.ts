import { useTypedSelector } from "./useTypedSelector";

export const useAddBasket = () => {
  const { basket } = useTypedSelector((state) => state);
;
  return { basket };
};

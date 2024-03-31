import { useTypedSelector } from "./useTypedSelector";

export const useAddCardProducts = () => {
  const addCardProducts = useTypedSelector((state) => state.cardProducts);

  return { addCardProducts };
};

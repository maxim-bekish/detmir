import { useTypedSelector } from "./useTypedSelector";

export const useAddProducts = () => {
  const products = useTypedSelector((state) => state.products);
  return { products };
};

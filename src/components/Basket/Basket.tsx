import { useAddBasket } from "../../hooks/useAddBasket";
import { useGetBasketQuery } from "../../store/api/api";
import st from "./basket.module.scss";
export const Basket: React.FC = () => {
  const { basket } = useAddBasket();
  const { data } = useGetBasketQuery(null);
  console.log(data)
  return (
    <>
      <div></div>
    </>
  );
};
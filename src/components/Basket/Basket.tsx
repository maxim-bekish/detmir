import { useAddBasket } from "../../hooks/useAddBasket";
import st from "./basket.module.scss";
import { BasketItem } from "../BasketItem/BasketItem";
import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { totalPrice } from "../../helpFun/totalPrice";

export const Basket: React.FC = () => {
  const { basket } = useAddBasket();

  return (
    <div className={st.basket}>
      {basket.map((el) => (
        <BasketItem key={el.product.id} data={el} />
      ))}
      <div className={st.result}>
        <h3>Итог</h3>
        <p>{totalPrice(basket)} ₽</p>
      </div>
      <CheckoutButton />
    </div>
  );
};

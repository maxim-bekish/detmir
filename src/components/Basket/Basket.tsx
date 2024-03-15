import { useAddBasket } from "../../hooks/useAddBasket";
import st from "./basket.module.scss";
import { BasketItem } from "../BasketItem/BasketItem";
import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
export const Basket: React.FC = () => {
  const { basket } = useAddBasket();
  let totalPrice = 0;
  basket.forEach((item): number => {
    // Умножаем цену на количество и добавляем к общей стоимости
    totalPrice += item.product.price * item.quantity;
    return totalPrice;
  });

  return (
    <div className={st.basket}>
      {basket.map((el) => (
        <BasketItem key={el.product.id} data={el} />
      ))}
      <div className={st.result}>
        <h3>Итог</h3>
        <p>{totalPrice} ₽</p>
      </div>
      <CheckoutButton />
      {/* <button className={st.button}>Оформить заказ</button> */}
    </div>
  );
};

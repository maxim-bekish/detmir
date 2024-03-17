import { useEffect, useState } from "react";
import { totalPrice } from "../../helpFun/totalPrice";
import { useAddBasket } from "../../hooks/useAddBasket";
import { usePostCheckoutBasketMutation } from "../../store/api/basket.api";
import st from "./checkoutButton.module.scss";
import { useUpdateQuantity } from "../../hooks/useUpdateQuantity";

export const CheckoutButton: React.FC = () => {
  const { updateQuantity } = useUpdateQuantity();
  const [dis, setDis] = useState(false);
  const [submitBasket] = usePostCheckoutBasketMutation();
  const post = () => {
    submitBasket({})
      .unwrap()
      .then(() => {
        updateQuantity(null, 0);
      });
  };
  const { basket } = useAddBasket();

  useEffect(() => {
    if (totalPrice(basket) > 10000) setDis(true);
    if (totalPrice(basket) < 10000) setDis(false);
    if (basket.length === 0) setDis(true);
  }, [basket]);

  return (
    <>
      <button disabled={dis} onClick={post} className={st.handleBasket}>
        Оформить заказ
      </button>
      {dis? <p> limit in button</p>: ''}
    </>
  );
};

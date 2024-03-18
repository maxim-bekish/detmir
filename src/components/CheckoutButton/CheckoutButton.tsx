import { usePostCheckoutBasketMutation } from "../../store/api/basket.api";
import st from "./checkoutButton.module.scss";
import { useUpdateQuantity } from "../../hooks/useUpdateQuantity";
import { useValidateBasket } from "../../hooks/useValidateBasket";
import { useGetCheckoutQuery } from "../../store/api/api";

export const CheckoutButton: React.FC = () => {
  const [submitBasket] = usePostCheckoutBasketMutation();
  const post = () => {
    submitBasket({})
      .unwrap()
      .then(() => {
        updateQuantity(null, 0);
      });
  };
  const { updateQuantity } = useUpdateQuantity();

  const { isValid, isError } = useValidateBasket();


  return (
    <div className={st.handleBasket}>
      {isValid && <p>{isError}</p>}
      <button disabled={isValid} onClick={post}>
        Оформить заказ
      </button>
    
    </div>
  );
};

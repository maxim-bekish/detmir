import st from "./checkoutButton.module.scss";
import { useUpdateQuantity } from "../../hooks/useUpdateQuantity";
import { useValidateBasket } from "../../hooks/useValidateBasket";
import { usePostPlaceOrdersMutation } from "../../store/api/postPlaceOrders.api";

export const CheckoutButton: React.FC = () => {
  const [submitBasket] = usePostPlaceOrdersMutation();
  const post = () => {
    submitBasket({})
      .unwrap()
      .then(() => {
        updateQuantity(null, 0);
      });
  };
  const { updateQuantity } = useUpdateQuantity();

  const { isValid } = useValidateBasket();

  return (
    <div className={st.handleBasket}>
      {/* {isValid && <p>{isError}</p>} */}
      <button disabled={isValid} onClick={post}>
        Оформить заказ
      </button>
    </div>
  );
};

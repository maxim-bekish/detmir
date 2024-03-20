import st from "./checkoutButton.module.scss";
import { useUpdateQuantity } from "../../hooks/useUpdateQuantity";
import { useValidateBasket } from "../../hooks/useValidateBasket";
import { usePostPlaceOrdersMutation } from "../../store/api/postPlaceOrders.api";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useActions } from "../../hooks/useActions";

export const CheckoutButton: React.FC = () => {
  const [submitBasket] = usePostPlaceOrdersMutation();
  const { basket } = useAddBasket();
  const { updateOrdersInRedux } = useActions();
  const post = () => {
    submitBasket({})
      .unwrap()
      .then(() => {
        updateQuantity(null, 0);
        updateOrdersInRedux({ data: [basket], meta: { count: 1, total: 1 } });
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

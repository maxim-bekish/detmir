import st from "./checkoutButton.module.scss";
import { useUpdateBasket } from "../../hooks/useUpdateBasket";
import { useValidateBasket } from "./useValidateBasket";
import { usePostPlaceOrdersMutation } from "../../store/api/postPlaceOrders.api";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useActions } from "../../hooks/useActions";

export const CheckoutButton: React.FC = () => {
  const [submitBasket] = usePostPlaceOrdersMutation();
  const { basket } = useAddBasket();
  const { updateBasketItems } = useUpdateBasket();
  const { updateOrdersInRedux } = useActions();
  const post = () => {
    submitBasket({})
      .unwrap()
      .then(() => {
        updateBasketItems([{ id: "null", quantity: 0 }], {
          addOrReplaceBasket: false,
          addOrReplaceItem: false,
        });
        updateOrdersInRedux({ data: [basket], meta: { count: 1, total: 1 } });
      });
  };

  const { isValid } = useValidateBasket();

  return (
    <div className={st.handleBasket}>
      <button data-close-on-click={true} disabled={isValid} onClick={post}>
        Оформить заказ
      </button>
    </div>
  );
};

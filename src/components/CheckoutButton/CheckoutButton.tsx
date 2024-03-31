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
  const { updateOrdersInRedux, updateModalInRedux } = useActions();
  const post = () => {
    submitBasket({})
      .unwrap()
      .then(() => {
        updateBasketItems([{ id: "null", quantity: 0 }], {
          addOrReplaceBasket: false,
          addOrReplaceItem: false,
        });
        updateOrdersInRedux({ data: [basket], meta: { count: 0, total: 0 } });
        updateModalInRedux({ modal: true, error: "ok" });
        setTimeout(() => {
          updateModalInRedux({ modal: false, error: "ok" });
        }, 2000);
      })
      .catch((err: { data: { error: string }; status: number }) => {
        updateModalInRedux({ modal: true, error: err.data.error });
        setTimeout(() => {
          updateModalInRedux({ modal: false, error: err.data.error });
        }, 2000);
        console.error(
          `Ошибка! 
          Сообщение ошибки: "${err.data.error}"
          Код ошибки: ${err.status}`
        );
      });
  };

  const { isValid } = useValidateBasket();

  return (
    <>
      <div className={st.handleBasket}>
        <button data-close-on-click={true} disabled={isValid} onClick={post}>
          Оформить заказ
        </button>
      </div>
    </>
  );
};

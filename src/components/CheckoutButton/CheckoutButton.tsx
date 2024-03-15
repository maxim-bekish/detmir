import { useGetCheckoutQuery } from "../../store/api/api";
import { usePostCheckoutBasketMutation } from "../../store/api/basket.api";
import st from "./checkoutButton.module.scss";
export const CheckoutButton: React.FC = () => {
  const [xxx] = usePostCheckoutBasketMutation();
  const post = () => {
    xxx([])
      .unwrap()
      .then((res) => {
        // toggleBasket(res);
        console.log("res  ", res);
        // console.log("basket ", basket);
        // Обработка успешного выполнения запроса
      })
      .catch((error) => {
        console.error("ошибочка", error);
      });
  };
  const { data, refetch } = useGetCheckoutQuery(null);
  const get = () => {
    refetch();
    if (data) console.log(data);
  };

  return (
    <>
      <button onClick={post} className={st.handleBasket}>
        Оформить заказ
      </button>
      <button onClick={get}> check </button>
    </>
  );
};

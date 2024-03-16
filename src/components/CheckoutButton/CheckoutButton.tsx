import { useEffect, useState } from "react";
import { totalPrice } from "../../helpFun/totalPrice";
import { useAddBasket } from "../../hooks/useAddBasket";
// import { useGetCheckoutQuery } from "../../store/api/api";
import { usePostCheckoutBasketMutation } from "../../store/api/basket.api";
import st from "./checkoutButton.module.scss";

export const CheckoutButton: React.FC = () => {
  const [dis, setDis] = useState(false);
  const [xxx] = usePostCheckoutBasketMutation();
  const post = () => {
    xxx({});
  };
  const { basket } = useAddBasket();
  // console.log(basket);
  useEffect(() => {
    // console.log(totalPrice(basket));
    if (totalPrice(basket) > 10000) setDis(true);
    if (totalPrice(basket) < 10000) setDis(false);
    if (basket.length === 0) setDis(true);
  }, [basket]);

  // const { data, refetch } = useGetCheckoutQuery(null);
  // const get = () => {
  //   refetch();
  //   if (data) console.log(data);
  // };

  return (
    <>
      <button disabled={dis} onClick={post} className={st.handleBasket}>
        Оформить заказ
      </button>
      {/* <button onClick={get}>get</button> */}
    </>
  );
};

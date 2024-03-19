import { useAddBasket } from "../../hooks/useAddBasket";
import st from "./basket.module.scss";
import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { Link, useLocation } from "react-router-dom";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";
import { useMemo } from "react";
import { totalPrice } from "../../helpFun/totalPrice";

export const Basket: React.FC = () => {
  const { basket } = useAddBasket();
  const { pathname } = useLocation();
  const memoizedTotalPrice = useMemo(() => totalPrice, []);





  return (
    <div className={st.basket}>
      <div className={st.openBasketPage}>
        {pathname === "/basket" ? "" : <Link to="basket">Open</Link>}
      </div>
      {basket.map((data) => (
        <section key={data.product.id} className={st.miniWrapper}>
          <div className={st.left}>
          <img className={st.img} src={data.product.picture} alt="" />
          <Link to={`/cardProduct/${data.product.id}`}>
            <h2 className={st.title}>{data.product.title}</h2>
          </Link>
          </div>
          <div className={st.right}>
          <AddRemoveInBasket
            propsInBasket={{ id: data.product.id, quantity: data.quantity }}
          />
          <div className={st.price}>
            <p className={st.priceOne}>{data.product.price} ₽ за шт.</p>
            <p className={st.priceAll}>
              {data.quantity * data.product.price} ₽
            </p>
          </div>
          </div>
        </section>
      ))}
      <div className={st.result}>
        <h3>Итог</h3>
        <p>{memoizedTotalPrice(basket)} ₽</p>
      </div>
      <CheckoutButton />
    </div>
  )
};

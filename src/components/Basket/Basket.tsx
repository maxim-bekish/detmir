import { useAddBasket } from "../../hooks/useAddBasket";
import st from "./basket.module.scss";
import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { totalPrice } from "../../helpFun/totalPrice";
import { Link } from "react-router-dom";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";

export const Basket: React.FC = () => {
  const { basket } = useAddBasket();

  return (
    <div className={st.basket}>
      {basket.map((data) => (
        <div key={data.product.id} className={st.miniWrapper}>
          <img className={st.img} src={data.product.picture} alt="" />
          <Link to={`cardProduct/${data.product.id}`}>
            <h2 className={st.title}>{data.product.title}</h2>
          </Link>
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
      ))}
      <div className={st.result}>
        <h3>Итог</h3>
        <p>{totalPrice(basket)} ₽</p>
      </div>
      <CheckoutButton />
    </div>
  );
};

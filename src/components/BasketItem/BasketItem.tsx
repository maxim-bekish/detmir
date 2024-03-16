import { useState } from "react";
import { ICard } from "../../types/card.types";
import st from "./basketItem.module.scss";
import { Link } from "react-router-dom";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";

interface Props {
  data: ICard;
}

export const BasketItem: React.FC<Props> = ({ data }) => {
  const [count, setCount] = useState(data.quantity);

  return (
    <>
      <div key={data.product.id} className={st.miniWrapper}>
        <img className={st.img} src={data.product.picture} alt="" />
        <Link to={`cardProduct/${data.product.id}`}>
          <h2 className={st.title}>{data.product.title}</h2>
        </Link>
        <AddRemoveInBasket
          obj={{ id: data.product.id, count: count, setCount: setCount }}
        />
        <div className={st.price}>
          <p className={st.priceOne}>{data.product.price} ₽ за шт.</p>
          <p className={st.priceAll}>{data.quantity * data.product.price} ₽</p>
        </div>
      </div>
    </>
  );
};

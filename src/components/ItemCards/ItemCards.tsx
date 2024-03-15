import st from "./ItemCards.module.scss";
// import { useActions } from "../../hooks/useActions";

import { ICards } from "./../../types/card.types";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

interface ItemCardsProps {
  cards: ICards[];
}

export const ItemCards: React.FC<ItemCardsProps> = ({ cards }) => {
  return (
    <section className={st.cards}>
      {cards.map((el) => (
        <Link
          to={`cardProduct/${el.id}`}
          key={`key-${el.id}`}
          className={st.card}
        >
          <div className={st.preview}>
            <img src={el.picture} alt="img" />
          </div>
          <div className={st.info}>
            <div className={st.title}>
              <p className={st.name}>{el.title}</p>
              {/* <div className={st.rating}>{el.rating}</div> */}
              <Rating stars={el.rating} />
            </div>
            <div>
              <p className={st.price}>{el.price} ₽</p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

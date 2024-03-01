import st from "./ItemCards.module.scss";
// import { useActions } from "../../hooks/useActions";

import { ICard } from "./../../types/card.types";
import Rating from "../Rating/Rating";
interface IItemCardsProps {
  cards: ICard[];
}

export const ItemCards: React.FC<IItemCardsProps> = ({ cards }) => {
  // const { toggleBasket } = useActions(); // add in basket



  // если первая цифра 4 отобразить отобразить 4 картинки
  // если вторая цифра меньше нет или меньше 6 оторазить половинку если больше 5 отобразить целую

  return (
    <section className={st.cards}>
      {cards.map((el) => (
        <div key={`key-${el.id}`} className={st.card}>
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
        </div>
      ))}
    </section>
  );
};

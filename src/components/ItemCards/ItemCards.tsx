import st from "./ItemCards.module.scss";

import { useActions } from "../../hooks/useActions";
import { useAddBasket } from "../../hooks/useAddBasket";
import { ICard } from "./../../types/card.types";
interface wwwType {
  www: ICard;
}

export const ItemCards: React.FC<wwwType> = ({ www }: wwwType) => {
  const { inBasket } = useAddBasket();

  const { toggleInBasket } = useActions();

  // www карточка товара
  const isExists = inBasket.some((r) => r.id === www.id); //для отображения в браузере в корзине или нет. yj;yj ,eltn

  return (
    <>
      <div className={st.card}>
        <div className={st.preview}>
          <img src="#" alt="img" />
        </div>
        <div className={st.info}>
          <div>
            <p className={st.name}> {www.name} </p>
            <div className={st.rating}></div>
          </div>
          <div>
            <p className={st.price}> </p>
          </div>
          <button onClick={() => toggleInBasket(www)}></button>
        </div>
      </div>
    </>
  );
};

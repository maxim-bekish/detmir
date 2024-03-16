import st from "./checkout.module.scss";
import { useEffect, useRef, useState } from "react";

import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";

type ComponentProps = {
  id: string;
};

export const Checkout: React.FC<ComponentProps> = ({ id }) => {
  const divinest = useRef<HTMLDivElement>(null);
  const inBasket = useRef<HTMLButtonElement>(null);

  const [count, setCount] = useState(-1);

  // Проверяем наличие элементов перед изменением стилей
  useEffect(() => {
    // console.log(count);
    if (divinest.current && inBasket.current) {
      // Показываем divinest и скрываем inBasket, если count больше 0
      if (count > 0) {
        divinest.current.style.display = "flex";
        inBasket.current.style.display = "none";
      } else {
        // В противном случае, скрываем divinest и показываем inBasket
        divinest.current.style.display = "none";
        inBasket.current.style.display = "flex";
      }
    }
  }, [count]);

  const addInBasket = () => {
    setCount(1);
  };

  return (
    <div className={st.addBasket}>
      <div ref={divinest} className={st.inputWrap}>
        <AddRemoveInBasket obj={{ id: id, count: count, setCount: setCount }} />
        <CheckoutButton  />
      </div>
      <button ref={inBasket} className={st.handleBasket} onClick={addInBasket}>
        Добавить в корзину
      </button>
    </div>
  );
};

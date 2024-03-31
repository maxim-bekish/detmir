import st from "./checkout.module.scss";
import { useEffect, useRef, useState } from "react";

import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { useUpdateBasket } from "../../hooks/useUpdateBasket";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";
import { ProductInBasket } from "../../types/card.types";

export const Checkout: React.FC<{ productInBasket: ProductInBasket }> = ({
  productInBasket,
}) => {
  const divinest = useRef<HTMLDivElement>(null);
  const inBasket = useRef<HTMLButtonElement>(null);
  const { updateBasketItems } = useUpdateBasket();

  // Проверяем наличие элементов перед изменением стилей
  useEffect(() => {
    if (divinest.current && inBasket.current) {
      // Показываем divinest и скрываем inBasket, если count больше 0
      if (productInBasket.quantity > 0) {
        divinest.current.style.display = "flex";
        inBasket.current.style.display = "none";
      } else {
        // В противном случае, скрываем divinest и показываем inBasket
        divinest.current.style.display = "none";
        inBasket.current.style.display = "flex";
      }
    }
  }, [productInBasket.quantity]);

  const addInBasket = () => {
    updateBasketItems([{ id: productInBasket.id, quantity: 1 }], {
      addOrReplaceBasket: false,
      addOrReplaceItem: false,
    });
  };

  return (
    <>
      <div className={st.addBasket}>
        <div ref={divinest} className={st.inputWrap}>
          <div className={st.addRemoveInBasket}>
            <AddRemoveInBasket propsInBasket={productInBasket} />
          </div>
          <div className={st.checkoutButton}>
            <CheckoutButton />
          </div>
        </div>
        <button
          ref={inBasket}
          className={st.handleBasket}
          onClick={addInBasket}
        >
          Добавить в корзину
        </button>
      </div>
    </>
  );
};

import st from "./checkout.module.scss";
import { useEffect, useRef } from "react";
import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { useUpdateQuantity } from "../../hooks/useUpdateQuantity";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";
import { ProductInBasket } from "../../types/card.types";

export const Checkout: React.FC<{ productInBasket: ProductInBasket }> = ({
  productInBasket,
}) => {
  const divinest = useRef<HTMLDivElement>(null);
  const inBasket = useRef<HTMLButtonElement>(null);
  const { updateQuantity } = useUpdateQuantity();

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
    updateQuantity(productInBasket.id, 1);
  };

  return (
    <div className={st.addBasket}>
      <div ref={divinest} className={st.inputWrap}>
        <AddRemoveInBasket propsInBasket={productInBasket} />
        <CheckoutButton />
      </div>
      <button ref={inBasket} className={st.handleBasket} onClick={addInBasket}>
        Добавить в корзину
      </button>
    </div>
  );
};

import st from "./checkout.module.scss";
import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import { useRef, useState } from "react";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
type ComponentProps = {
  id?: string;
};
export const Checkout: React.FC<ComponentProps> = ({ id }) => {
  const [count, setCount] = useState(1);
  const divinest = useRef<HTMLDivElement>(null);
  const inBasket = useRef<HTMLButtonElement>(null);

  const addInBasket = (e: any) => {
    setCount(1);
    if (divinest.current) divinest.current.style.display = "flex";
    e.target.style.display = "none";
  };
  const [xxx] = usePostCardBasketMutation();
  const placeOrder = () => {
    xxx({
      data: [
        {
          id: id,
          quantity: count,
        },
      ],
    });
  };
  if (1 > count) if (divinest.current) divinest.current.style.display = "none";
  if (1 > count) if (inBasket.current) inBasket.current.style.display = "flex";

  return (
    <div className={st.addBasket}>
      <div ref={divinest} className={st.inputWrap}>
        <div className={st.input}>
          <button onClick={() => setCount(count - 1)}>
            <img src={minus} alt="" />
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button onClick={() => setCount(count + 1)}>
            <img src={plus} alt="" />
          </button>
        </div>

        <button className={st.handleBasket} onClick={placeOrder}>
          Оформить заказ
        </button>
      </div>
      <button
        ref={inBasket}
        className={st.handleBasket}
        onClick={(e) => addInBasket(e)}
      >
        Добавить в корзину
      </button>
    </div>
  );
};

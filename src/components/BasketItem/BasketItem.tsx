import { useState, useEffect } from "react";
import { ICard } from "../../types/card.types";
import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import st from "./basketItem.module.scss";
import { Link } from "react-router-dom";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useActions } from "../../hooks/useActions";

interface Props {
  data: ICard;
}

export const BasketItem: React.FC<Props> = ({ data }) => {
  const [count, setCount] = useState(data.quantity);
  const { basket } = useAddBasket();
  const { toggleBasket } = useActions();
  const updateState = (bool: boolean) => {
    setCount((prevCount: any) => (bool ? prevCount + 1 : prevCount - 1));
  };

  const [xxx] = usePostCardBasketMutation();

  useEffect(() => {
    // Отправляем запрос на сервер после изменения count через 0.5 секунд если стейт(count) не ровен -1
    const timer = setTimeout(() => {
      if (count >= 0) {
        clearTimeout(timer);

        let updatedBasket: { quantity: number; id: string }[];
        if (basket.length === 0) {
          if (count <= 0) return null;

          updatedBasket = [{ quantity: count, id: data.product.id }];
        } else {
          updatedBasket = basket
            .map((item: ICard) => {
              if (Number(item.product.id) === Number(data.product.id)) {
                if (count <= 0) return null;
                // в этом случае нужно
                return { quantity: count, id: item.product.id };
              }
              return { quantity: item.quantity, id: item.product.id };
            })
            .filter((item): item is { quantity: number; id: string } => !!item);
          // Добавляем новый объект, если такого ID не было в basket
          const isNewItemExist = basket.some(
            (item) => Number(item.product.id) === Number(data.product.id)
          );
          if (!isNewItemExist && count > 0) {
            updatedBasket.push({ quantity: count, id: data.product.id });
          }
        }
        console.log("do ", updatedBasket);

        xxx({ data: updatedBasket })
          .unwrap()
          .then((res) => {
            toggleBasket(res);
            // console.log("res  ", res);
            // console.log("basket ", basket);
            // Обработка успешного выполнения запроса
          })
          .catch((error) => {
            console.error("ошибочка", error);
          });
      }
    }, 500);

    return () => clearTimeout(timer);

    // Очищаем таймер при каждом обновлении count
  }, [count]);

  return (
    <>
      <div key={data.product.id} className={st.miniWrapper}>
        <img className={st.img} src={data.product.picture} alt="" />
        <Link to={`cardProduct/${data.product.id}`}>
          <h2 className={st.title}>{data.product.title}</h2>
        </Link>
        <div className={st.input}>
          <button onClick={() => updateState(false)}>
            <img src={minus} alt="" />
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button onClick={() => updateState(true)}>
            <img src={plus} alt="" />
          </button>
        </div>
        <div className={st.price}>
          <p className={st.priceOne}>{data.product.price} ₽ за шт.</p>
          <p className={st.priceAll}>{data.quantity * data.product.price} ₽</p>
        </div>
      </div>
    </>
  );
};

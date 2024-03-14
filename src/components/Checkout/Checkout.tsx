import st from "./checkout.module.scss";
import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import { useEffect, useRef, useState } from "react";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useActions } from "../../hooks/useActions";
import { useAddBasket } from "../../hooks/useAddBasket";
import { ICard } from "../../types/card.types";

type ComponentProps = {
  id: string;
};

export const Checkout: React.FC<ComponentProps> = ({ id }) => {
  const { basket } = useAddBasket(); // получение состояния корзины в redux
  const [count, setCount] = useState(-1);

  const { toggleBasket } = useActions(); // add in basket

  useEffect(() => {
    if (!id) return setCount(-1); // Если id не определен, возвращаем -1
    const productInBasket = basket.find(
      (e) => Number(e.product.id) === Number(id)
    );

    return productInBasket ? setCount(productInBasket.quantity) : setCount(-1); // Если продукт найден, возвращаем его количество, иначе -1
  }, [basket]);

  const updateState = (bool: boolean) => {
    setCount((prevCount) => (bool ? prevCount + 1 : prevCount - 1));
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

          updatedBasket = [{ quantity: count, id: id }];
        } else {
          updatedBasket = basket
            .map((item: ICard) => {
              if (Number(item.product.id) === Number(id)) {
                if (count <= 0) return null;
                return { ...item, quantity: count };
              }
              return { quantity: item.quantity, id: item.product.id };
            })
            .filter((item): item is { quantity: number; id: string } => !!item);
          // Добавляем новый объект, если такого ID не было в basket
          const isNewItemExist = basket.some(
            (item) => Number(item.product.id) === Number(id)
          );
          if (!isNewItemExist && count > 0) {
            updatedBasket.push({ quantity: count, id: id });
          }
        }
        // console.log("do ", updatedBasket);

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

  const divinest = useRef<HTMLDivElement>(null);

  const inBasket = useRef<HTMLButtonElement>(null);

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

        <button className={st.handleBasket}>Оформить заказ</button>
      </div>
      <button ref={inBasket} className={st.handleBasket} onClick={addInBasket}>
        Добавить в корзину
      </button>
    </div>
  );
};

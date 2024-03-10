import st from "./checkout.module.scss";
import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import { useEffect, useRef, useState } from "react";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useActions } from "../../hooks/useActions";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useGetBasketQuery } from "../../store/api/api";
type ComponentProps = {
  id?: string;
};

type cardsInfoType = {
  quantity: number;
  id: string;
};

// ПРОДОЛЖИТЬ РАЗБИРАТЬ ПОРЯДОК ДЕЙСТВИЙ ОБНОВЛЕНИЯ СОСТОЯНИЯ

export const Checkout: React.FC<ComponentProps> = ({ id }) => {
  const { data } = useGetBasketQuery(null); // получение состояния корзины с сервера
  const { basket } = useAddBasket(); // получение состояния корзины в redux

  console.log(data, "api");
  const filterAddBasket = (basket: any) => {
    if (!id) return -1; // Если id не определен, возвращаем -1
    const productInBasket = basket.find(
      (e: any) => Number(e.product.id) === Number(id)
    );
    return productInBasket ? productInBasket.quantity : -1; // Если продукт найден, возвращаем его количество, иначе -1
  };
  const { toggleBasket } = useActions(); // add in basket
  const [count, setCount] = useState(filterAddBasket(basket) || -1);
  const divinest = useRef<HTMLDivElement>(null);
  const inBasket = useRef<HTMLButtonElement>(null);
  let timer: any;

  const toggleButton = () => {
    // Проверяем наличие элементов перед изменением стилей
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
  };

  toggleButton();
  const addInBasket = (e: any) => {
    setCount(1);
    if (count !== 0) addAndRemoveBasket();

    toggleButton();
  };

  const updateState = (bool: boolean) => {
    setCount((prevCount: any) => (bool ? prevCount + 1 : prevCount - 1));
  };
  const [xxx] = usePostCardBasketMutation();

  if (data) {
    data.forEach((el) => {
      toggleBasket({ quantity: el.quantity, id: el.product.id });
    });
  }

  const addAndRemoveBasket = () => {
    if (count !== -1) {
      clearTimeout(timer);

      xxx({ data: basket })
        .unwrap()
        .then((datas) => {
          // Обработка успешного выполнения запроса
        })
        .catch((error) => {
          console.error("ошибочка", error);
        });
    }
  };
  useEffect(() => {
    // Отправляем запрос на сервер после изменения count через 0.5 секунд если стейт(count) не ровен -1
    const timer = setTimeout(() => {
      addAndRemoveBasket();
    }, 500);

    return () => clearTimeout(timer);

    // Очищаем таймер при каждом обновлении count
  }, [count]);

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

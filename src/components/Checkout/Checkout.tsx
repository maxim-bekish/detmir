import st from "./checkout.module.scss";
// import minus from "./../../assets/SVG/minus.svg";
// import plus from "./../../assets/SVG/plus.svg";
import { useEffect, useRef, useState } from "react";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useActions } from "../../hooks/useActions";
import { useAddBasket } from "../../hooks/useAddBasket";
import { AddRemoveBasket } from "../AddRemoveBasket/AddRemoveBasket";

type ComponentProps = {
  id: string;
};

export const Checkout: React.FC<ComponentProps> = ({ id }) => {
  // const { basket } = useAddBasket(); // получение состояния корзины в redux
  // console.log(basket);
  // const { toggleBasket } = useActions(); // add in basket

  // useEffect(() => {
  //   if (!id) return setCountChek(-1); // Если id не определен, возвращаем -1
  //   const productInBasket = basket.find(
  //     (e: any) => Number(e.id) === Number(id)
  //   );

  //   return productInBasket
  //     ? setCountChek(productInBasket.quantity)
  //     : setCountChek(-1); // Если продукт найден, возвращаем его количество, иначе -1
  // }, [basket]);

  // const updateState = (bool: boolean) => {
  //   setCount((prevCount: any) => (bool ? prevCount + 1 : prevCount - 1));
  // };

  // const [xxx] = usePostCardBasketMutation();

  // useEffect(() => {
  //   // Отправляем запрос на сервер после изменения count через 0.5 секунд если стейт(count) не ровен -1
  //   const timer = setTimeout(() => {
  //     const eee = [{ quantity: count, id: id }];
  //     const result = [...basket, ...eee];

  //     if (count !== -1) {
  //       clearTimeout(timer);

  //       xxx({ data: result })
  //         .unwrap()
  //         .then(() => {
  //           if (id) toggleBasket({ quantity: count, id: id });

  //           // Обработка успешного выполнения запроса
  //         })
  //         .catch((error) => {
  //           console.error("ошибочка", error);
  //         });
  //     }
  //   }, 500);

  //   return () => clearTimeout(timer);

  //   // Очищаем таймер при каждом обновлении count
  // }, [count]);

  const [countChek, setCountChek] = useState(false);
  const divinest = useRef<HTMLDivElement>(null);

  const inBasket = useRef<HTMLButtonElement>(null);

  // const toggleButton = () => {
  // Проверяем наличие элементов перед изменением стилей
  useEffect(() => {
    // console.log(countChek);
    if (divinest.current && inBasket.current) {
      // Показываем divinest и скрываем inBasket, если count больше 0
      if (countChek) {
        // console.log(1);
        divinest.current.style.display = "flex";
        inBasket.current.style.display = "none";
      } else {
        // console.log(2);
        // В противном случае, скрываем divinest и показываем inBasket
        divinest.current.style.display = "none";
        inBasket.current.style.display = "flex";
      }
    }
  }, [countChek]);
  // };

  // toggleButton();
  const addInBasket = () => {
    setCountChek(true);

    // if (divinest.current && inBasket.current) {
    //   inBasket.current.style.display = "none";
    //   divinest.current.style.display = "flex";
    // }
    // toggleButton();
  };

  function updateBoolean(x: boolean): void {
    setCountChek(x);
  }
  return (
    <div className={st.addBasket}>
      <div ref={divinest} className={st.inputWrap}>

   <AddRemoveBasket prop={{ countChek, id, updateBoolean }} />
        {/* <div className={st.input}>
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
        </div> */}

        <button className={st.handleBasket}>Оформить заказ</button>
      </div>
      <button ref={inBasket} className={st.handleBasket} onClick={addInBasket}>
        Добавить в корзину
      </button>
    </div>
  );
};

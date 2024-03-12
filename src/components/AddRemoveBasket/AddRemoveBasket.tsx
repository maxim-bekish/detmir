import st from "./addRemoveBasket.module.scss";
import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import { useEffect, useState } from "react";
import { useAddBasket } from "../../hooks/useAddBasket";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useActions } from "../../hooks/useActions";
// type UpdateBooleanFunction = ;
type ComponentProps = {
  prop: {
    id: string;
    countChek: boolean;
    updateBoolean: (x: boolean) => void;
  };
};
export const AddRemoveBasket: React.FC<ComponentProps> = ({ prop }) => {
  const [count, setCount] = useState(0);
  const { toggleBasket } = useActions();
  const { basket } = useAddBasket(); // получение состояния корзины в redux
const [countInitialized, setCountInitialized] = useState(false);

useEffect(() => {
  if (prop.countChek && !countInitialized) {
    setCount(1);
    setCountInitialized(true);
  }
}, [prop.countChek, countInitialized]);

const updateState = (bool: boolean) => {
  if (!countInitialized && bool) {
    setCount(1);
    setCountInitialized(true);
  } else {
    setCount(bool ? count + 1 : count - 1);
  }
};
  useEffect(() => {
    if (!prop.id) return setCount(0); // Если id не определен, возвращаем -1
    const productInBasket = basket.find(
      (e: any) => Number(e.id) === Number(prop.id)
    );

    return productInBasket ? setCount(productInBasket.quantity) : setCount(0); // Если продукт найден, возвращаем его количество, иначе -1
  }, [basket]);
  // const updateState = (bool: boolean) => {
  //   setCount(bool ? count + 1 : count - 1);
  // };
  const [xxx] = usePostCardBasketMutation();

// СОЗДАТЬ НЕ ФУНКЦИЮ ИЗМЕНЕНИЯ СТЕЙТА


  useEffect(() => {
    if (count < 1) prop.updateBoolean(false);
    if (count > 1) prop.updateBoolean(true);
    const timer = setTimeout(() => {
      // clearTimeout(timer);

      if (count >= 0) {
        clearTimeout(timer);

        let updatedBasket: { quantity: number; id: string }[];
        if (basket.length === 0) {
          if (count === 0) return null;

          updatedBasket = [{ quantity: count, id: prop.id }];
        } else {
          updatedBasket = basket
            .map((item: { quantity: number; id: string }) => {
              if (Number(item.id) === Number(prop.id)) {
                if (count === 0) return null;
                return { ...item, quantity: count };
              }
              return { quantity: item.quantity, id: item.id };
            })
            .filter((item): item is { quantity: number; id: string } => !!item);
          // Добавляем новый объект, если такого ID не было в basket
          const isNewItemExist = basket.some(
            (item) => Number(item.id) === Number(prop.id)
          );
          if (!isNewItemExist && count !== 0) {
            updatedBasket.push({ quantity: count, id: prop.id });
          }
        }
        console.log("do ", updatedBasket);
        xxx({ data: updatedBasket })
          .unwrap()
          .then((res) => {
            console.log("posle ", updatedBasket);
            toggleBasket(res);
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
  );
};

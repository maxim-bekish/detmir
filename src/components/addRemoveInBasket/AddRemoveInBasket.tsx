import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useActions } from "../../hooks/useActions";
import { useAddBasket } from "../../hooks/useAddBasket";
import { ICard } from "../../types/card.types";
import st from "./addRemoveInBasket.module.scss";
import { useEffect } from "react";

type xxx = {
  obj: {
    id: string;
    count: number;
    setCount: any;
  };
};

export const AddRemoveInBasket: React.FC<xxx> = ({ obj }) => {
  const { toggleBasket } = useActions(); // add in basket
  const { basket } = useAddBasket();
  useEffect(() => {
    if (!obj.id) return obj.setCount(-1); // Если id не определен, возвращаем -1
    const productInBasket = basket.find(
      (e) => Number(e.product.id) === Number(obj.id)
    );
    // console.log(productInBasket);
    return productInBasket
      ? obj.setCount(productInBasket.quantity)
      : obj.setCount(-1); // Если продукт найден, возвращаем его количество, иначе -1
  }, [basket, obj.id]);
  const [xxx] = usePostCardBasketMutation();
  useEffect(() => {
    // Отправляем запрос на сервер после изменения count через 0.5 секунд если стейт(count) не ровен -1
    if (obj.count > 10) obj.setCount(10);

    const timer = setTimeout(() => {
      if (obj.count >= 0 && obj.count <= 10) {
        clearTimeout(timer);

        let updatedBasket: { quantity: number; id: string }[];
        if (basket.length === 0) {
          if (obj.count <= 0) return null;

          updatedBasket = [{ quantity: obj.count, id: obj.id }];
        } else {
          updatedBasket = basket
            .map((item: ICard) => {
              if (Number(item.product.id) === Number(obj.id)) {
                if (obj.count <= 0) return null;
                // в этом случае нужно
                return { quantity: obj.count, id: item.product.id };
              }
              return { quantity: item.quantity, id: item.product.id };
            })
            .filter((item): item is { quantity: number; id: string } => !!item);
          // Добавляем новый объект, если такого ID не было в basket
          const isNewItemExist = basket.some(
            (item) => Number(item.product.id) === Number(obj.id)
          );
          if (!isNewItemExist && obj.count > 0) {
            updatedBasket.push({ quantity: obj.count, id: obj.id });
          }
        }
        console.log("do ", updatedBasket);
        // debugger

        xxx({ data: updatedBasket })
          .unwrap()
          .then((res) => {
            toggleBasket(res);
          })
          .catch((error) => {
            console.error("ошибочка", error);
          });
      }
    }, 500);

    return () => clearTimeout(timer);
    // Очищаем таймер при каждом обновлении count
  }, [obj.count]);

  return (
    <div className={st.input}>
      <button
        onClick={() => {
          obj.setCount(obj.count - 1);
        }}
      >
        <img src={minus} alt="" />
      </button>
      <input
        type="number"
        value={obj.count}
        onChange={(e) => obj.setCount(Number(e.target.value))}
      />
      <button
        onClick={() => {
          obj.setCount(obj.count + 1);
        }}
      >
        <img src={plus} alt="" />
      </button>
    </div>
  );
};

import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import { usePostCardBasketMutation } from "../../store/api/basket.api";
import { useActions } from "../../hooks/useActions";
import { useAddBasket } from "../../hooks/useAddBasket";
import st from "./addRemoveInBasket.module.scss";
import { useEffect } from "react";
import { updateLocalBasket } from "../../helpFun/updateLocalBasket";

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
      if (obj.count >= 0) {
        const basketPost = updateLocalBasket(basket, obj.count, obj.id);
        clearTimeout(timer);
        console.log(basketPost);
        xxx({ data: basketPost })
          .unwrap()
          .then((res) => {
            toggleBasket(res);
          })
          .catch((error) => {
            console.error("ошибочка", error);
          });
      }
    }, 300);

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
        onChange={(e) =>
          Number(e.target.value) < 0
            ? obj.setCount(0)
            : obj.setCount(Number(e.target.value))
        }
      />
      <button
        disabled={obj.count >= 10}
        onClick={() => {
          obj.setCount(obj.count + 1);
        }}
      >
        <img src={plus} alt="" />
      </button>
    </div>
  );
};

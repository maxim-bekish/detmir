import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import st from "./addRemoveInBasket.module.scss";
import { validateInput } from "./validateInput";
import { useUpdateBasket } from "../../hooks/useUpdateBasket";
import { ProductInBasket } from "../../types/card.types";
import { debounce } from "lodash";
import { useState } from "react";

export const AddRemoveInBasket: React.FC<{
  propsInBasket: ProductInBasket;
}> = ({ propsInBasket }) => {
  const { id, quantity } = propsInBasket;
  const [inputValue, setInputValue] = useState(quantity);
  const { updateBasketItems } = useUpdateBasket();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Валидация
    const error = validateInput(value);
    // Если нет ошибок, обновить state
    if (!error) {
      updateBasketItems([{ id: id, quantity: value }], {
        addOrReplaceBasket: false,
        addOrReplaceItem: true,
      });
    }
  };

  const handleDecrement = debounce(() => {
    updateBasketItems([{ id: id, quantity: -1 }], {
      addOrReplaceBasket: false,
      addOrReplaceItem: false,
    });
  }, 150);

  const handleIncrement = debounce(() => {
    updateBasketItems([{ id: id, quantity: +1 }], {
      addOrReplaceBasket: false,
      addOrReplaceItem: false,
    });
  }, 150);
  return (
    <div className={st.input}>
      <button onClick={() => handleDecrement()}>
        <img src={minus} alt="" />
      </button>
      <input type="number" value={quantity} onChange={handleInputChange} />

      <button disabled={quantity >= 10} onClick={() => handleIncrement()}>
        <img src={plus} alt="" />
      </button>
    </div>
  );
};

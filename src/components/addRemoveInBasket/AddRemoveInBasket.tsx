import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import st from "./addRemoveInBasket.module.scss";
import { validateInput } from "../../helpFun/validateInput";
import { useUpdateQuantity } from "../../hooks/useUpdateQuantity";
import { ProductInBasket } from "../../types/card.types";


export const AddRemoveInBasket: React.FC<{propsInBasket: ProductInBasket}> = ({ propsInBasket }) => {
  const { id, quantity } = propsInBasket;
  const { updateQuantity } = useUpdateQuantity();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    // Валидация
    const error = validateInput(value);

    // Если нет ошибок, обновить state
    if (!error) {
      updateQuantity(id, value);
    }
  };

  return (
    <div className={st.input}>
      <button
        onClick={() => {
          updateQuantity(id, quantity - 1);
        }}
      >
        <img src={minus} alt="" />
      </button>
      <input type="number" value={quantity} onChange={handleInputChange} />

      <button
        disabled={quantity >= 10}
        onClick={() => {
          updateQuantity(id, quantity + 1);
        }}
      >
        <img src={plus} alt="" />
      </button>
    </div>
  );
};

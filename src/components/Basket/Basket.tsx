import { useState } from "react";
import { useAddBasket } from "../../hooks/useAddBasket";
// import { useGetBasketQuery } from "../../store/api/api";
import minus from "./../../assets/SVG/minus.svg";
import plus from "./../../assets/SVG/plus.svg";
import st from "./basket.module.scss";
export const Basket: React.FC = () => {
  const [count, setCount] = useState(-1);
  const { basket } = useAddBasket();
  console.log(basket)
  // const { data } = useGetBasketQuery(null);
  // console.log(data)
  const updateState = (bool: boolean) => {
    setCount((prevCount: any) => (bool ? prevCount + 1 : prevCount - 1));
  };
  return (
    <>
      <div>
        <div className={st.miniWrapper}>
          <img className={st.img} src="" alt="" />
          <h2 className={st.title}></h2>
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
            <p></p>
            <p></p>
          </div>
        </div>
        <div className={st.result}>
          <h3></h3>
          <p></p>
        </div>
        <button className={st.button}></button>
      </div>
    </>
  );
};

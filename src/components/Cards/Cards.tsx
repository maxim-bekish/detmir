import { useDispatch, useSelector } from "react-redux";
import st from "./cards.module.scss";
import { actions } from "../../store/inBasket/inBasket.slice";
export const Cards: React.FC = () => {
  const { inBasket } = useSelector((state) => state);

  const dispatch = useDispatch();
// www Элемент котороый 
  const isExists = inBasket.some((r) => r.id === www.is);

  return (
    <>
      <div className={st.card}>
        <div className={st.preview}>
          <img src="#" alt="img" />
        </div>
        <div className={st.info}>
          <div>
            <p className={st.name}></p>
            <div className={st.rating}></div>
          </div>
          <div>
            <p className={st.price}></p>
          </div>
          <button onClick={() => dispatch(actions.toggleInBasket())}></button>
        </div>
      </div>
    </>
  );
};

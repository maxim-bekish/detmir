import { Basket } from "../../components/Basket/Basket";
import st from './basketPage.module.scss'
export const BasketPage: React.FC = () => {
  return (
    <div className={st.wrapp} >
      <Basket></Basket>;
    </div>
  );
};

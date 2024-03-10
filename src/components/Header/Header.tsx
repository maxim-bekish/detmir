import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
import "./../../style/scss/allStyle.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
import { NavLink } from "react-router-dom";
import { Basket } from "../Basket/Basket";
import { useGetBasketQuery } from "../../store/api/api";
export const Header: React.FC = () => {
  // const { basket } = useAddBasket();
  const { data } = useGetBasketQuery(null);
  return (
    <header className={st.header}>
      <div className={st.container}>
        <div className={st.header__logo}>
          <img src={logo} alt="Logo" />
        </div>
        <nav className={st.header__navigating}>
          <ul>
            <li>
              <NavLink to="">Товары</NavLink>
            </li>
            <li>
              <NavLink to="orders">Заказы</NavLink>
            </li>
          </ul>
        </nav>
        <div className={st.header__cart}>
          <img src={cart} alt="Cart" />
          <p>Корзина({data?data.length:''})</p>
          <Basket />
        </div>
      </div>
    </header>
  );
};

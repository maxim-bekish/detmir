import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
import "./../../style/scss/allStyle.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
import { NavLink } from "react-router-dom";
import { Basket } from "../Basket/Basket";
import { useState } from "react";

export const Header: React.FC = () => {
  const [toggleBasket, setToggleBasket] = useState(false);
  const { basket } = useAddBasket();
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
        <div
          onClick={() => setToggleBasket(!toggleBasket)}
          className={st.header__cart}
        >
          <img src={cart} alt="Cart" />
          <p>Корзина({basket.length})</p>
        </div>
        <div
          className={st.containerBasket}
          style={{
            display: toggleBasket ? "block" : "none",
          }}
        >
          <Basket />
        </div>
      </div>
    </header>
  );
};

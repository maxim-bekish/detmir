import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
import "./../../style/scss/allStyle.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
import { NavLink } from "react-router-dom";
import { Basket } from "../Basket/Basket";
import { useEffect, useRef, useState } from "react";

export const Header: React.FC = () => {
  const [toggleBasket, setToggleBasket] = useState(false);
  const [toggleBurger, setToggleBurger] = useState(true);

  // useEffect(() => {
  //   //   window.addEventListener("resize", () => setWidth(window.innerWidth));
  //   //   setWidth(window.innerWidth);
  //   if (window.innerWidth > 480) {
  //     // console.log(width);
  //     setToggleBurger(false);
  //   }
  //   if (window.innerWidth <= 480) {
  //     // console.log(width);
  //     setToggleBurger(true);
  //   }
  //   console.log(window.innerWidth);
  // }, []);
  const { basket } = useAddBasket();
  return (
    <header className={st.header}>
      <div className={st.container}>
        <div className={st.header__logo}>
          <img src={logo} alt="Logo" />
        </div>
        {/* <nav className={st.header__navigating}> */}
        <nav
          className={
            st.header__navigating
          }
        >
          <ul>
            <li>
              <NavLink to="/">Товары</NavLink>
            </li>
            <li>
              <NavLink to="orders">Заказы</NavLink>
            </li>
            <li>
              <NavLink to="basket">Корзина ({basket.length})</NavLink>
            </li>
          </ul>
        </nav>
        <div
          onClick={() => setToggleBurger(!toggleBurger)}
          className={st.burger}
        >
          <span></span>
          <span></span>
          <span></span>
       
        </div>
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

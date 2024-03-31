import { NavLink } from "react-router-dom";
import st from "./index.module.scss";

export const MenuHeader: React.FC<{
  burgerMenuRef: React.RefObject<HTMLDivElement>;
  basket: number;
  toggleBurgerMenu: boolean;
}> = ({ burgerMenuRef, basket, toggleBurgerMenu }) => {
  return (
    <>
      <nav
        ref={burgerMenuRef}
        className={
          toggleBurgerMenu
            ? st.header__navigating
            : `${st.header__navigating} ${st.none}`
        }
      >
        <ul>
          <li>
            <NavLink data-close-on-click={true} to="/">
              Товары
            </NavLink>
          </li>
          <li>
            <NavLink data-close-on-click={true} to="orders">
              Заказы
            </NavLink>
          </li>
          <li>
            <NavLink data-close-on-click={true} to="basket">
              Корзина {basket === 0 ? "" : `(${basket})`}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

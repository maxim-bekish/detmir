import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
export const Header: React.FC = () => {
const { inBasket } = useAddBasket();


  return (
    <header className={st.header}>
      <div className={st.container}>
        <div className={st.header__logo}>
          <img src={logo} alt="Logo" />
        </div>
        <nav className={st.header__navigating}>
          <ul>
            <li>
              <a href="#">Товары</a>
            </li>
            <li>
              <a href="#">Заказы</a>
            </li>
          </ul>
        </nav>
        <div className={st.header__cart}>
          <img src={cart} alt="Cart" />
          <p>Корзина({inBasket.length})</p>
        </div>
      </div>
    </header>
  );
};

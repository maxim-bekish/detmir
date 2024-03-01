import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
import { Link } from "react-router-dom";
export const Header: React.FC = () => {
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
              <Link to="">Товары</Link>
            </li>
            <li>
              <Link to="orders">Заказы</Link>
            </li>
          </ul>
        </nav>
        <div className={st.header__cart}>
          <img src={cart} alt="Cart" />
          <p>Корзина({basket.length})</p>
        </div>
      </div>
    </header>
  );
};

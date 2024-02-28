import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
export const Header = () => {
  return (
    <header className={st.header}>
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Товары</a>
          </li>
          <li>
            <a href="#">Заказы</a>
          </li>
        </ul>
      </nav>
      <div>
        <img src={cart} alt="Cart" />
        <p>Корзина</p>
      </div>
    </header>
  );
};

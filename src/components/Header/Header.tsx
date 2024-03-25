import logo from "./../../assets/SVG/Logo.svg";
import cart from "./../../assets/SVG/Cart.svg";
import st from "./header.module.scss";
import "./../../style/scss/allStyle.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Basket } from "../Basket/Basket";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useGetBasketQuery } from "../../store/api/getBasket";
import { ErrorCustom } from "../../pages/ErrorCustom/ErrorCustom";
import { Loader } from "../Loader/Loader";

export const Header: React.FC = () => {
  const [toggleBasket, setToggleBasket] = useState<boolean>(false);
  const [toggleBurger, setToggleBurger] = useState<boolean>(false);
  const { pathname } = useLocation();

  const { basket } = useAddBasket();
  const blockRef = useRef<HTMLDivElement>(null);
  const www = useRef<HTMLDivElement>(null);
  const desktopBasket = useRef<HTMLDivElement>(null);

  const { updateBasketInRedux } = useActions(); // add in basket

  const { data, isSuccess, isLoading, isError } = useGetBasketQuery(null); // получение корзины с сервера

  useEffect(() => {
    if (isSuccess) {
      updateBasketInRedux(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (pathname === "/basket") setToggleBasket(false);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleBurger &&
        blockRef.current &&
        !blockRef.current.contains(event.target as Node)
      ) {
        setToggleBurger(false);
      }
      if (
        toggleBurger &&
        www.current &&
        !www.current.contains(event.target as Node)
      ) {
        setToggleBasket(false);
      }
      if (
        toggleBasket &&
        desktopBasket.current &&
        !desktopBasket.current.contains(event.target as Node) &&
        !www.current?.contains(event.target as Node)
      ) {
        console.log(desktopBasket.current);
        setToggleBasket(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [toggleBurger, pathname, toggleBasket]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setToggleBasket(false);
      }
    };

    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Вызываем обработчик при загрузке компонента, чтобы установить начальное состояние
    handleResize();

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isError) return <ErrorCustom />;
  if (isLoading) return <Loader />;
  return (
    <header className={st.header}>
      <div className={st.container}>
        <Link to="/">
          <div className={st.header__logo}>
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <nav
          className={
            toggleBurger
              ? st.header__navigating
              : `${st.header__navigating} ${st.none}`
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
              <NavLink to="basket">
                Корзина {basket.length === 0 ? "" : `(${basket.length})`}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div
          ref={www}
          onClick={() => {
            pathname === "/basket"
              ? setToggleBasket(false)
              : setToggleBasket(!toggleBasket);
          }}
          className={st.header__cart}
        >
          <img src={cart} alt="Cart" />
          <p> Корзина {basket.length === 0 ? "" : `(${basket.length})`}</p>
        </div>
        <div
          ref={blockRef}
          onClick={() => setToggleBurger(!toggleBurger)}
          className={st.burger}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          ref={desktopBasket}
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

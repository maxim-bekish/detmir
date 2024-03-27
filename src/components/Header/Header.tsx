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
import { useClickOutside } from "./useClickOutside";
import { ErrorCustomType } from "../../types/card.types";

export const Header: React.FC = () => {
  const [toggleBasket, setToggleBasket] = useState<boolean>(false);
  const [toggleBurgerMenu, setToggleBurgerMenu] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { basket } = useAddBasket();
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const desktopBasketRef = useRef<HTMLDivElement>(null);
  const burgerMenuRefButton = useRef<HTMLDivElement>(null);
  const desktopBasketRefButton = useRef<HTMLDivElement>(null);

  const { updateBasketInRedux } = useActions(); // add in basket

  const { data, isSuccess, isLoading, isError, error } =
    useGetBasketQuery(null); // получение корзины с сервера

  useEffect(() => {
    if (isSuccess) {
      updateBasketInRedux(data);
    }
  }, [isSuccess, data]);

  useClickOutside(burgerMenuRef, burgerMenuRefButton, () =>
    setToggleBurgerMenu(false)
  );
  useClickOutside(desktopBasketRef, desktopBasketRefButton, () =>
    setToggleBasket(false)
  );

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const prevWidth = windowWidth;
      setWindowWidth(newWidth);

      // Закрытие модальных окон при переходе между диапазонами 480px и 481px
      if (
        (prevWidth <= 480 && newWidth >= 481) ||
        (prevWidth >= 481 && newWidth <= 480)
      ) {
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
  }, [windowWidth]);
  if (isError) {
    const errorResponse = error as ErrorCustomType;
    return <ErrorCustom errors={errorResponse} />;
  }
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
                Корзина {basket.length === 0 ? "" : `(${basket.length})`}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div
          ref={desktopBasketRefButton}
          onClick={() => {
            if (pathname !== "/basket") {
              setToggleBasket(!toggleBasket);
            }
          }}
          className={st.header__cart}
        >
          <img src={cart} alt="Cart" />
          <p> Корзина {basket.length === 0 ? "" : `(${basket.length})`}</p>
        </div>
        {windowWidth <= 480 && (
          <div
            ref={burgerMenuRefButton}
            onClick={() => setToggleBurgerMenu(!toggleBurgerMenu)}
            className={st.burger}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {windowWidth > 480 && (
          <div
            ref={desktopBasketRef}
            className={
              toggleBasket ? st.containerBasket : st.containerBasketNone
            }
          >
            <Basket />
          </div>
        )}
      </div>
    </header>
  );
};

import st from "./index.module.scss";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useGetBasketQuery } from "../../store/api/getBasket";
import { ErrorCustom } from "../../pages/ErrorCustom/ErrorCustom";
import { Loader } from "../Loader/Loader";
import { useClickOutside } from "./useClickOutside";
import { ErrorCustomType } from "../../types/card.types";
import { Logo } from "../Logo/Logo";
import { MenuHeader } from "../MenuHeader/MenuHeader";
import { BasketHeader } from "../BasketHeader/BasketHeader";
import { BurgerMenuHeader } from "../BurgerMenuHeader/BurgerMenuHeader";

export const Header: React.FC = () => {
  const [toggleBasket, setToggleBasket] = useState<boolean>(false);
  const [toggleBurgerMenu, setToggleBurgerMenu] = useState<boolean>(false);
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

  if (isError) {
    const errorResponse = error as ErrorCustomType;
    return <ErrorCustom errors={errorResponse} />;
  }
  // if (isLoading) return <Loader />;
  return (
    <header className={st.header}>
      <div className={st.container}>
        <Logo />
        <MenuHeader
          burgerMenuRef={burgerMenuRef}
          basket={basket.length}
          toggleBurgerMenu={toggleBurgerMenu}
        />
        <BasketHeader
          desktopBasketRefButton={desktopBasketRefButton}
          setToggleBasket={setToggleBasket}
          toggleBasket={toggleBasket}
          basket={basket.length}
          desktopBasketRef={desktopBasketRef}
        />
        <BurgerMenuHeader
          burgerMenuRefButton={burgerMenuRefButton}
          setToggleBurgerMenu={setToggleBurgerMenu}
          toggleBurgerMenu={toggleBurgerMenu}
        />
      </div>
    </header>
  );
};

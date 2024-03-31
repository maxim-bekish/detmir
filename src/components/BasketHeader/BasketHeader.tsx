import st from "./index.module.scss";
import cart from "./../../assets/SVG/Cart.svg";
import { Basket } from "../Basket/Basket";
import { useLocation } from "react-router-dom";
export const BasketHeader: React.FC<{
  desktopBasketRefButton: React.RefObject<HTMLDivElement>;
  setToggleBasket: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBasket: boolean;
  basket: number;
  desktopBasketRef: React.RefObject<HTMLDivElement>;
}> = ({
  desktopBasketRefButton,
  setToggleBasket,
  toggleBasket,
  basket,
  desktopBasketRef,
}) => {
  const { pathname } = useLocation();
  return (
    <>
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
        <p> Корзина {basket === 0 ? "" : `(${basket})`}</p>
      </div>
      <div
        ref={desktopBasketRef}
        className={toggleBasket ? st.containerBasket : st.containerBasketNone}
      >
        <Basket />
      </div>
    </>
  );
};

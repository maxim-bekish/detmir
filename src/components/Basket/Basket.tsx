import { useAddBasket } from "../../hooks/useAddBasket";
import st from "./basket.module.scss";
import trash from "./../../assets/SVG/Trash.svg";
import { CheckoutButton } from "../CheckoutButton/CheckoutButton";
import { Link, useLocation } from "react-router-dom";
import { AddRemoveInBasket } from "../addRemoveInBasket/AddRemoveInBasket";
import { useMemo, useState } from "react";
import { totalPrice } from "../../helpFun/totalPrice";
import { useUpdateBasket } from "../../hooks/useUpdateBasket";

export const Basket: React.FC = () => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const handleMouseEnter = (itemId: string) => {
    setHoveredItemId(itemId);
  };
  const { updateBasketItems } = useUpdateBasket();
  const deleteItem = (id: string) => {
    updateBasketItems([{ id: id, quantity: 0 }], {
      addOrReplaceBasket: false,
      addOrReplaceItem: true,
    });
  };
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  const { basket } = useAddBasket();
  const { pathname } = useLocation();
  const memoizedTotalPrice = useMemo(() => totalPrice, []);

  return (
    <div className={st.basket}>
      <div className={st.openBasketPage}>
        {pathname === "/basket" ? "" : <Link to="basket">Open</Link>}
      </div>
      <section className={st.itemsAll}>
        {basket.length === 0 ? (
          <div className={st.zeroBasket}>
            <span>Корзина пустая</span>
            <Link to={"/"} data-close-on-click={true}>
              Перейти к выбору товара
            </Link>
          </div>
        ) : (
          basket.map((item) => (
            <div key={item.product.id} className={st.miniWrapper}>
              <div className={st.left}>
                <img className={st.img} src={item.product.picture} alt="" />
                <Link to={`/cardProduct/${item.product.id}`}>
                  <h2 data-close-on-click={true} className={st.title}>
                    {item.product.title}
                  </h2>
                </Link>
              </div>
              <div className={st.right}>
                <AddRemoveInBasket
                  propsInBasket={{
                    id: item.product.id,
                    quantity: item.quantity,
                  }}
                />
                <div
                  onMouseEnter={() => handleMouseEnter(item.product.id)}
                  onMouseLeave={handleMouseLeave}
                  className={st.priceAndTrash}
                >
                  <div
                    className={`${st.price} ${
                      hoveredItemId === item.product.id ? st.hidden : ""
                    }`}
                  >
                    <p className={st.priceOne}>{item.product.price} ₽ за шт.</p>
                    <p className={st.priceAll}>
                      {item.quantity * item.product.price} ₽
                    </p>
                  </div>
                  <div
                    className={`${st.trash}  ${
                      hoveredItemId === item.product.id ? "" : st.hidden
                    }`}
                    onClick={() => deleteItem(item.product.id)}
                  >
                    <img src={trash} alt="" />
                    <span>Удалить</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
      <div className={st.result}>
        <h3>Итог</h3>
        <p>{memoizedTotalPrice(basket) || 0} ₽</p>
      </div>
      <CheckoutButton />
    </div>
  );
};

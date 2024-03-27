import st from "./orders.module.scss";
import { totalPrice } from "../../helpFun/totalPrice";
import { formatDate } from "./formatDate";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetOrdersQuery } from "../../store/api/getOrders";
import { useActions } from "../../hooks/useActions";
import { useAddOrders } from "../../hooks/useAddOrders";
import { useUpdateBasket } from "../../hooks/useUpdateBasket";
import { ErrorCustomType, ICard } from "../../types/card.types";
import { Loader } from "../../components/Loader/Loader";
import { ErrorCustom } from "../ErrorCustom/ErrorCustom";
import { useNavigate } from "react-router-dom";

export const Orders: React.FC = () => {
  const [step, setStep] = useState(1);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const { orders } = useAddOrders();
  const { updateOrdersInRedux } = useActions();
  const { updateBasketItems } = useUpdateBasket();

  const { ref, inView } = useInView({
    threshold: 0, // как только элемент появится на экране, даже частично, inView станет true.
    rootMargin: "50px",
  });
  const { data, isLoading, refetch, isError, error } = useGetOrdersQuery(step); // получение заказов с сервера
  useEffect(() => {
    if (inView && data && data.meta.count > 0 && !isLoading) {
      setStep((prevStep) => prevStep + 1);
    }
  }, [inView, data]);

  useEffect(() => {
    if (data) {
      if (data.meta.total > orders.data.length && data.meta.count > 0) {
        refetch();
        updateOrdersInRedux(data);
      }
    }
  }, [step, isLoading]);

  const openOrder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const dataAttribute = (e.target as HTMLButtonElement).getAttribute(
      "data-update"
    );

    if (expandedIndex === Number(e.currentTarget.id)) {
      if (!dataAttribute) setExpandedIndex(null);
    } else {
      setExpandedIndex(Number(e.currentTarget.id));
    }
  };

  const addOrderInBasket = (element: ICard[], bool: boolean) => {
    const res = element.map((el) => ({
      quantity: el.quantity,
      id: el.product.id,
    }));

    updateBasketItems(res, {
      addOrReplaceBasket: bool,
      addOrReplaceItem: false,
    });
  };
  const openItemCard = (idProduct: string) => {
    navigate(`/cardProduct/${idProduct}`);
  };

  if (isLoading) return <Loader />;

  if (isError) {
    const errorResponse = error as ErrorCustomType;
    return <ErrorCustom errors={errorResponse} />;
  }

  if (orders.data.length === 0) {
    return (
      <>
        <div>Заказов пока что нет</div>
      </>
    );
  }

  return (
    <>
      <section className={st.wrapper}>
        {orders.data.map((element, elementID) => (
          <div
            onClick={(e) => openOrder(e)}
            key={elementID}
            id={`${elementID}`}
            className={`${st.container} ${
              expandedIndex === elementID ? st.containerBig : ""
            }`}
          >
            <section className={st.openInfo}>
              <div className={st.left}>
                <div className={st.orderID}>
                  <p className={st.order}> Заказ</p>
                  <p className={st.iD}>№{elementID + 1}</p>
                </div>
                <div className={st.images}>
                  {element.map((el, elID) => {
                    if (elID < 4) {
                      return (
                        <div className={st.image} key={elementID + elID}>
                          <img src={el.product.picture} alt="img" />
                        </div>
                      );
                    } else if (elID === 4) {
                      return (
                        <div className={st.endImage} key={elementID + elID}>
                          <span>и т.д.</span>
                        </div>
                      );
                    } else {
                      return null; // Пропускаем остальные элементы массива
                    }
                  })}
                </div>
              </div>
              <div className={st.right}>
                <span className={`${st.div1} ${st.title}`}>Оформлено</span>
                <span className={`${st.div2} ${st.value}`}>
                  {formatDate(element[0].createdAt)}
                </span>
                <span className={`${st.div3} ${st.title}`}>На сумму</span>
                <span className={`${st.div4} ${st.value}`}>
                  {totalPrice(element)} ₽
                </span>
              </div>
            </section>
            {expandedIndex === elementID && (
              <>
                <section className={st.closedInfo}>
                  <table className={st.table}>
                    <thead>
                      <tr>
                        <th className={st.idTable}>№</th>
                        <th className={st.imgTable}></th>
                        <th className={st.titleTable}>Название</th>
                        <th className={st.quantityTable}>Кол.</th>
                        <th className={st.priceTable}>Цена</th>
                      </tr>
                    </thead>
                    <tbody className={st.tbody}>
                      {element.map((el, elId) => (
                        <tr
                          key={`tr${elId}`}
                          className={st.itemTable}
                          onClick={() => openItemCard(el.product.id)}
                        >
                          <td className={st.idTable}>{elId + 1}</td>
                          <td className={st.imgTable}>
                            <img src={el.product.picture} alt="" />
                          </td>
                          <td className={st.titleTable}>
                            <p> {el.product.title}</p>
                          </td>
                          <td className={st.quantityTable}>{el.quantity}</td>
                          <td className={st.priceTable}>{el.product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <div className={st.closedButtons}>
                  <button
                    onClick={() => addOrderInBasket(element, false)}
                    className={st.addBasket}
                    data-update={"add"}
                  >
                    Добавить к корзине
                  </button>
                  <button
                    onClick={() => addOrderInBasket(element, true)}
                    className={st.updateBasket}
                    data-update={"update"}
                  >
                    Обновить корзину
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      <div ref={ref}> чек поинт</div>
    </>
  );
};

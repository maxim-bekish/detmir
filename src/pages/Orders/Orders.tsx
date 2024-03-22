import st from "./orders.module.scss";
import { totalPrice } from "../../helpFun/totalPrice";

import { formatDate } from "../../helpFun/formatDate";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetOrdersQuery } from "../../store/api/getOrders";
import { useActions } from "../../hooks/useActions";
import { useAddOrders } from "../../hooks/useAddOrders";
import { useUpdateBasket } from "../../hooks/useUpdateBasket";
import { ICard } from "../../types/card.types";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const Orders: React.FC = () => {
  const [step, setStep] = useState(1);
  const { orders } = useAddOrders();
  const { updateOrdersInRedux } = useActions();
  const { updateBasketItems } = useUpdateBasket();

  const { ref, inView } = useInView({
    threshold: 0, // как только элемент появится на экране, даже частично, inView станет true.
    rootMargin: "50px",
  });
  const { data, isLoading, refetch, isError } = useGetOrdersQuery(step); // получение заказов с сервера
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

  const addOrderInBasket = (e: ICard[]) => {
    const res = e.map((el) => ({
      id: el.product.id,
      quantity: el.quantity,
    }));

    const bool = window.confirm("перезаписать?");
    updateBasketItems(res, bool);
  };


  if (isLoading) return <LoadingComponent />;

  if (isError) return <div>Error</div>;





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
          <div key={elementID} className={st.container}>
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
            <button onClick={() => addOrderInBasket(element)}></button>
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
          </div>
        ))}
      </section>
      <div ref={ref}> чек поинт</div>
    </>
  );


};

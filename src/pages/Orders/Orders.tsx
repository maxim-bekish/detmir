import { useMemo } from "react";
import { useGetCheckoutQuery } from "../../store/api/api";
import st from "./orders.module.scss";
import { totalPrice } from "../../helpFun/totalPrice";
export const Orders: React.FC = () => {
  const memoizedTotalPrice = useMemo(() => totalPrice, []);
  const { data } = useGetCheckoutQuery(1);

  const formatDate = (dateString: string): string => {
    const months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year} г.`;
  };

  if (data) {
    console.log(data.data);
    return (
      <section className={st.wrapper}>
        {data.data.map((element, elementID) => (
          <div key={elementID} className={st.container}>
            <div className={st.left}>
              <div className={st.orderID}>
                <p>Заказ</p>
                <p>№ {elementID + 1}</p>
              </div>
              <div className={st.images}>
                {element.map((el, elID) => (
                  <img
                    key={elementID + elID}
                    src={el.product.picture}
                    alt="img"
                  />
                ))}
              </div>
            </div>
            <div className={st.right}>
              {/* <div className={st.orderDate}> */}
              <span className={`${st.div1} ${st.title}`}>Оформлено</span>
              <span className={`${st.div2} ${st.value}`}>
                {formatDate(element[0].createdAt)}
              </span>
              {/* </div> */}
              {/* <div className={st.totalPrice}> */}
              <span className={`${st.div3} ${st.title}`}>На сумму</span>
              <span className={`${st.div4} ${st.value}`}>
                {memoizedTotalPrice(element)} ₽
              </span>
              {/* </div> */}
            </div>
          </div>
        ))}
      </section>
    );
  }
  return <div>hi</div>;
};

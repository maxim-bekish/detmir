import { useGetCheckoutQuery } from "../../store/api/api";
import st from "./orders.module.scss";
import { totalPrice } from "../../helpFun/totalPrice";
import { ICard } from "../../types/card.types";
export const Orders: React.FC = () => {
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
  const get = (array: ICard[]) => {
    console.log(array);
  };
  if (data) {

    return (
      <section className={st.wrapper}>
        {data.data.map((element, elementID) => (
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
            <button onClick={() => get(element)}>get</button>
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
    );
  }
  return <div>hi</div>;
};

import { useGetCheckoutQuery } from "../../store/api/api";
import st from "./orders.module.scss";
export const Orders: React.FC = () => {
  const { data } = useGetCheckoutQuery(1);
  // data.data[0][0].quantity
  if (data) {
    return (
      <div className={st.container}>
        <div className={st.left}>
          <div className={st.orderID}>
            <p>Заказ</p>
            <p>№ 1</p>
          </div>
        </div>
        <div className={st.right}></div>
      </div>
    );
  }
  return <div>hi</div>
};

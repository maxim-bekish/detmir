import { Link, useParams } from "react-router-dom";
import { useGetCardQuery } from "../../store/api/api";
import shape from "./../../assets/SVG/Shape.svg";

import st from "./CardProduct.module.scss";
import Rating from "../../components/Rating/Rating";
import { Checkout } from "../../components/Checkout/Checkout";

export const CardProduct: React.FC = () => {
  const { id } = useParams<string>();
  const { data, isLoading } = useGetCardQuery(Number(id));

  if (data && id) {
    return (
      <div className={st.wrapper}>
        <div className={st.wrapperUp}>
          <div className={st.image}>
            <img src={data.picture} alt="img" />
          </div>
          <div className={st.info}>
            <div className={st.miniWrap}>
              <h2 className={st.title}>{data.title}</h2>
              <Rating stars={data.rating} />
            </div>
            <div className={st.miniWrap}>
              <p className={st.price}>{data.price} ₽</p>
              <Checkout id={id} />
            </div>
            <div className={`${st.return} ${st.miniWrap}`}>
              <Link
                target="_blank"
                to="https://detmir.by/pages/exchange_and_refund/"
              >
                <img src={shape} alt="shape" /> Условия возврата
              </Link>
              <p>
                Обменять или вернуть товар надлежащего качества можно в течение
                14 дней с момента покупки.
              </p>
            </div>
            <div className={`${st.addInfo} ${st.miniWrap} `}>
              Цены в интернет-магазине могут отличаться от розничных магазинов.
            </div>
          </div>
        </div>
        <div className={st.wrapperDown}>
          <h3>Описание</h3>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return <div>Чет не так</div>;
};

import { Link, useNavigate, useParams } from "react-router-dom";

import shape from "./../../assets/SVG/Shape.svg";
import back from "./../../assets/SVG/ArrowLeft.svg";

import st from "./CardProduct.module.scss";
import Rating from "../../components/Rating/Rating";
import { Checkout } from "../../components/Checkout/Checkout";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useGetCardQuery } from "../../store/api/getCard";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { ErrorCustom } from "../ErrorCustom/ErrorCustom";

export const CardProduct: React.FC = () => {
  const { id } = useParams<string>();
  const { data, isLoading, isError,isSuccess } = useGetCardQuery(Number(id));
  const { basket } = useAddBasket();
  const navigate = useNavigate();
  if (isLoading) return <LoadingComponent />;

  if (isError) return <ErrorCustom />;

  if (isSuccess && id) {
    const productInBasket = basket.reduce(
      (result, e) => {
        if (Number(e.product.id) === Number(id)) {
          result.id = e.product.id;
          result.quantity = e.quantity;
        }
        return result;
      },
      { id: id, quantity: -1 }
    );

    return (
      <>
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
                <div className={st.priceAndError}>
                  <p className={st.price}>{data.price} ₽</p>
                  {data.price * productInBasket.quantity > 10000 && (
                    <p className={st.error}>
                      Максимальная сумма товаров 10 000₽
                    </p>
                  )}
                </div>
                <Checkout productInBasket={productInBasket} />
              </div>

              <div className={`${st.return} ${st.miniWrap}`}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://detmir.by/pages/exchange_and_refund/"
                >
                  <img src={shape} alt="shape" /> Условия возврата
                </a>
                <p>
                  Обменять или вернуть товар надлежащего качества можно в
                  течение 14 дней с момента покупки.
                </p>
              </div>
              <div className={`${st.addInfo} ${st.miniWrap} `}>
                Цены в интернет-магазине могут отличаться от розничных
                магазинов.
              </div>
            </div>
          </div>
          <div className={st.wrapperDown}>
            <h3>Описание</h3>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        </div>
        <div onClick={() => navigate(-1)} className={st.back}>
          <img src={back} alt="arrowBack" />
          <span>Назад</span>
        </div>
      </>
    );
  }
  return <></>;
};

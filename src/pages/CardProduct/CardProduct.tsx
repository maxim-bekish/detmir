import { useNavigate, useParams } from "react-router-dom";

// import shape from "./../../assets/SVG/Shape.svg";
import back from "./../../assets/SVG/ArrowLeft.svg";

import st from "./CardProduct.module.scss";
import Rating from "../../components/Rating/Rating";
import { Checkout } from "../../components/Checkout/Checkout";
import { useAddBasket } from "../../hooks/useAddBasket";
import { useGetCardQuery } from "../../store/api/getCard";
import { Loader } from "../../components/Loader/Loader";
import { ErrorCustom } from "../ErrorCustom/ErrorCustom";
import { useActions } from "../../hooks/useActions";
import { ItemProduct } from "./ItemProduct";

export const CardProduct: React.FC = () => {
  const { id } = useParams<string>();
  const { data, isLoading, isError, isSuccess, error } = useGetCardQuery(
    Number(id)
  );
  const { addCardProducts } = useActions();

  const navigate = useNavigate();
  if (isLoading) return <Loader />;

  if (isError) {
    const errorResponse = error as {
      status: number;
      data: {
        error: string;
      };
    };
    return <ErrorCustom errors={errorResponse} />;
  }
  if (isSuccess) {
    addCardProducts(data);

  };
    return (
      <>
        {id && <ItemProduct id={id} />}
        <div onClick={() => navigate(-1)} className={st.back}>
          <img src={back} alt="arrowBack" />
          <span>Назад</span>
        </div>
      </>
    );
  }

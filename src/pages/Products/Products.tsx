import { ItemCards } from "./../../components/ItemCards/ItemCards";
import { Loader } from "./../../components/Loader/Loader";
import { useAddProducts } from "../../hooks/useAddProducts";
import { useGetProducts } from "./useGetProducts";
import { ErrorCustom } from "../ErrorCustom/ErrorCustom";
import { useInView } from "react-intersection-observer";
import { ErrorCustomType } from "../../types/card.types";
export const Product: React.FC = () => {
  const { products } = useAddProducts();

  const { ref, inView } = useInView({
    threshold: 0, // как только элемент появится на экране, даже частично, inView станет true.
    rootMargin: "50px",
  });
  const { isLoading, isError, error } = useGetProducts(inView);

  if (isLoading) return <Loader />;
  if (isError) {
    const errorResponse = error as ErrorCustomType;
    return <ErrorCustom errors={errorResponse} />;
  }

  return (
    <>
      <ItemCards cards={products.data} />
      <div ref={ref}></div>
    </>
  );
};

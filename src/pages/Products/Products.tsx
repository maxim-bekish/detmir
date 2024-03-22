import { ItemCards } from "./../../components/ItemCards/ItemCards";
import { LoadingComponent } from "./../../components/LoadingComponent/LoadingComponent";
import { useAddProducts } from "../../hooks/useAddProducts";
import { useGetProducts } from "../../hooks/useGetProducts";

export const Product: React.FC = () => {
  const { products } = useAddProducts();
  const { isLoading, ref, isError } = useGetProducts();

  if (isLoading) return <LoadingComponent />;

  if (isError) return <div>Error</div>;

  return (
    <>
      <ItemCards cards={products.data} />
      <div ref={ref}> чек поинт</div>
    </>
  );
};

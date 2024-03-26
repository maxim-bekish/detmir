import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../store/api/getCardsStart";
import { useActions } from "../../hooks/useActions";

export const useGetProducts = (inView: boolean) => {
  const [step, setStep] = useState(1);
  const { updateProductsInRedux } = useActions();

  const { data, isLoading, isError } = useGetProductsQuery(step);

  useEffect(() => {
    if (inView && !isLoading && data) {
      setStep((prevStep) => prevStep + 1);
      updateProductsInRedux(data);
    }
  }, [inView, data]);

  return { isLoading, isError };
};

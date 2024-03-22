import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store/api/getCardsStart";
import { useActions } from "./useActions";
import { useInView } from "react-intersection-observer";

export const useGetProducts = () => {
  const [step, setStep] = useState(1);
  const { updateProductsInRedux } = useActions();

  const { data, isLoading, refetch, isError, isSuccess } =
    useGetProductsQuery(step);

  const { ref, inView } = useInView({
    threshold: 0, // как только элемент появится на экране, даже частично, inView станет true.
    rootMargin: "50px",
  });
  useEffect(() => {
    if (isSuccess && data?.data.length) {
      updateProductsInRedux(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (inView && !isLoading && data && data.data.length > 0) {
      setStep(step + 1);
      console.log(123);
    }
  }, [inView]);

  return { isLoading, isError, ref };
};

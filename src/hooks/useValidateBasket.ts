import { useEffect, useState } from "react";
import { useAddBasket } from "./useAddBasket";

export const useValidateBasket = () => {
  const { basket } = useAddBasket();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  useEffect(() => {
    if (basket.length === 0) {
      setIsValid(true);
      setIsError("Корзина пуста");
      return;
    }

    const isBasketValid = basket.some((el) => {
      // регулярное выражение для обрезки до 2 слов
      setIsError(
        `Сумма товара ${el.product.title.replace(
          /^((\S+\s+){2}).*/,
          "$1"
        )}превышает 10 000`
      );
      return el.quantity * el.product.price > 10000;
    });
    setIsValid(isBasketValid);
  }, [basket]);

  return { isValid, isError };
};

import { useEffect, useState } from "react";
import { ItemCards } from "./../../components/ItemCards/ItemCards";
import { useGetCardsQuery } from "../../store/api/getCardsStart";
import { ICards } from "./../../types/card.types";
import { useInView } from "react-intersection-observer";

export const Product: React.FC = () => {
  const [cards, setCards] = useState<ICards[]>([]);
  const [step, setStep] = useState(1);

  const { data, isLoading } = useGetCardsQuery(step);

  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView && !isLoading && data && data.data.length > 0) {
      setStep(step + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (data && data.data.length > 0) {
      // Добавляем новые карточки к текущему состоянию

      setCards((prevCards) => [...prevCards, ...data.data]);
    }
  }, [data]);

  if (cards.length > 0) {
    return (
      <>
        <ItemCards cards={cards} />
        <div ref={ref}></div>
      </>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>No data available</div>;
};

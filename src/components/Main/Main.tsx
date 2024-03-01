import { ItemCards } from "../ItemCards/ItemCards";
import { useGetCardsQuery } from "./../../store/api/api";
import { ICard } from "./../../types/card.types";
import st from "./main.module.scss";
export const Main: React.FC = () => {
  const { data, isLoading } = useGetCardsQuery(null);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    const cards: ICard[] = data.data; // Определение переменной cards после загрузки данных
    return (
      <div className={st.main}>
        <ItemCards cards={cards} />
      </div>
    );
  }

  return <div>No data available</div>;
};

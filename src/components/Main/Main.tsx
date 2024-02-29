import { ItemCards } from "../ItemCards/ItemCards";

export const Main: React.FC = () => {
  return (
    <div>
      <ItemCards www={{ id: "id-1", name: "костюм" }}></ItemCards>
      <ItemCards www={{ id: "id-2", name: "трусы" }}></ItemCards>
      <ItemCards www={{ id: "id-3", name: "курта" }}></ItemCards>
    </div>
  );
};

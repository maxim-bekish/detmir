import { ICards } from "../../types/card.types";

export const findObjectById = (id: string, array: ICards[]) => {
  return array.find((obj) => obj.id === id);
};

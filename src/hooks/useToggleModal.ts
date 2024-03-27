import { useTypedSelector } from "./useTypedSelector";

export const useToggleModal = () => {
  const openModal = useTypedSelector((state) => state.openModal);

  return { openModal };
};

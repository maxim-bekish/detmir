import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  refButton: RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        refButton.current &&
        !refButton.current.contains(event.target as Node)
      ) {
        handler();
      }
    };

    const handleClickInside = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        // Проверяем, является ли клик внутри элемента с атрибутом data-close-on-click
        const closedElement = event.target as HTMLElement;
        const closeOnClick = closedElement.getAttribute("data-close-on-click");
        if (closeOnClick === "true") {
          handler(); // Закрываем окно
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickInside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleClickInside);
    };
  }, [ref, handler]);
};

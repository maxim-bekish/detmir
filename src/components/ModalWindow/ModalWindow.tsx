import st from "./index.module.scss";

export const ModalWindow: React.FC<{ error: string }> = ({ error }) => {
  return (
    <section className={st.modalWindow}>
      <div className={st.content}>
        {error === "ok"
          ? "Заказ успешно оформлен"
          : `Заказ не оформлен. ${error}`}
      </div>
    </section>
  );
};

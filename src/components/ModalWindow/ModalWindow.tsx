import st from "./index.module.scss";

export const ModalWindow: React.FC<{ setXxx: (value: boolean) => void }> = ({
  setXxx,
}) => {
  return (
    <section className={st.modalWindow}>
      <div className={st.content}>
        <p>
          Данное действие удалит все что есть в корзине и добавит только товара
          из этого заказа, вы уверены?
        </p>
        <div className={st.buttons}>
          <button onClick={() => setXxx(false)}>Да, я уверен!</button>
          <button>Нет, отменить действие</button>
        </div>
      </div>
    </section>
  );
};

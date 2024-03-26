import { useNavigate } from "react-router-dom";

import st from "./notFoundPage.module.scss"; 
export const NotFoundPage = () => {
  const navigate = useNavigate();


  return (
    <div className={st.notFoundPage}>
      <div className={st.notFoundMessage}>
        <h2>Ой!</h2>
        <p>
          Куда же все подевались?
          <br /> Страница, что вы искали, пропала без вести.
          <br /> Может, она за облаками, где звезды светят ярко,
          <br /> Или под водой, где рыбы плавают в морской пучине.
        </p>
        <p>
          <br /> Не беда, не стоит унывать,
          <br /> Мы уверены, вы найдете свой путь,
          <br /> А пока, давайте будем смеяться над этой загадкой,
          <br /> Где же скрылась та самая, загадочная страница?
        </p>
      </div>
      <button onClick={() => navigate("/")} className={st.homeButton}>
        Вернуться к списку товаров
      </button>
    </div>
  );
};

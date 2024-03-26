import { Link } from "react-router-dom";
import st from "./errorCustom.module.scss";

export const ErrorCustom: React.FC = () => {
  const error = "Error 404";
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div className={st.poeticErrorMessage}>
      <div className={st.content}>
        <p>
          В безмолвии цифрового пространства шепчет нам <br />
          <span>{error}</span> , ощущая пустоту внутри. Но даже здесь есть место
          для нашей истории. Добавьте свою ошибку, и позвольте ей стать частью
          этой виртуальной симфонии.
        </p>
        <p>
          И если заблудитесь, помните: нажмите кнопку "Попробовать еще раз",
          словно вдохновившись после тяжелого урока, или выберите "Вернуться на
          главную", где ваш след все еще озаряет путь к пониманию.
        </p>
        <p className={st.question}>
          Выберите свое приключение: плакать над потерянным файлом или смеяться
          над виртуальной природой наших ошибок?
        </p>
      </div>
      <div className={st.options}>
        <button onClick={refreshPage}>Попробовать еще раз</button>
        <Link to={"/"}>Вернуться на главную</Link>
      </div>
    </div>
  );
};

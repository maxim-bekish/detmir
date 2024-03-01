import full from "./../../assets/SVG/FillnessFull.svg";
import half from "./../../assets/SVG/FillnessHalf.svg";
import none from "./../../assets/SVG/FillnessNone.svg";

import st from "./rating.module.scss";
interface StarProps {
  src: string;
}

const Star: React.FC<StarProps> = ({ src }) => {
  return <img src={src} alt="star" />;
};

interface RatingProps {
  stars: number;
}

const Rating: React.FC<RatingProps> = ({ stars }) => {
  const renderedStars: JSX.Element[] = [];
  const fullStars = Math.floor(stars); // количество полностью закрашенных звезд
  const lastStarFraction = stars - fullStars; // дробная часть для определения состояния последней звезды

  // Рендер полностью закрашенных звезд
  for (let i = 0; i < fullStars; i++) {
    renderedStars.push(<Star key={i} src={full} />);
  }

  // Если рейтинг дробный и дробная часть меньше 0.2, добавляем пустую звезду
  if (lastStarFraction < 0.3) {
    renderedStars.push(<Star key="empty" src={none} />);
  }
  // Если дробная часть от 0.3 до 0.9, добавляем наполовину заполненную звезду
  else if (lastStarFraction <= 0.9) {
    renderedStars.push(<Star key="half" src={half} />);
  }
  // Если дробная часть больше 0.9, добавляем полностью закрашенную звезду
  else {
    renderedStars.push(<Star key="full" src={full} />);
  }

  // Дополняем рейтинг до пяти звезд
  while (renderedStars.length < 5) {
    renderedStars.push(<Star key={renderedStars.length} src={none} />);
  }

  return <div className={st.ratingStars}>{renderedStars}</div>;
};

export default Rating;

import { Link } from "react-router-dom";
import st from "./index.module.scss";
import logo from "./../../assets/SVG/Logo.svg";

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className={st.header__logo}>
        <img src={logo} alt="Logo" />
      </div>
    </Link>
  );
};

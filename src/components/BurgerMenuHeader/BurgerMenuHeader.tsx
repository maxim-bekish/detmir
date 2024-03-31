import st from "./index.module.scss";
export const BurgerMenuHeader: React.FC<{
  burgerMenuRefButton: React.RefObject<HTMLDivElement>;
  setToggleBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBurgerMenu: boolean;
}> = ({ burgerMenuRefButton, setToggleBurgerMenu, toggleBurgerMenu }) => {
  return (
    <div
      ref={burgerMenuRefButton}
      onClick={() => setToggleBurgerMenu(!toggleBurgerMenu)}
      className={st.burger}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

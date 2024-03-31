import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import './style/scss/allStyle.scss'
import { useToggleModal } from "./hooks/useToggleModal";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { useSpring, animated } from "react-spring";
export const App: React.FC = () => {
  const { openModal } = useToggleModal();
  const blockAnimation = useSpring({
    transform: openModal.modal ? "translateY(0px)" : "translateY(-150px)",
  });
  return (
    <>
      <BrowserRouter>
        <animated.div className="animationModalWindow" style={blockAnimation}>
          <ModalWindow error={openModal.error} />
        </animated.div>
        <Header />
        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;

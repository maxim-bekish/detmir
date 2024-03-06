import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Routes from "./routes";

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;

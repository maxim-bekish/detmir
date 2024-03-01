import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Routes from "./routes";


export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes />

      </BrowserRouter>
    </>
  );
};

export default App;

import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Routes from "./routes";
import { useGetBasketQuery } from "./store/api/api";
import { useActions } from "./hooks/useActions";
import { useEffect, useState } from "react";

export const App: React.FC = () => {
  const { data } = useGetBasketQuery(null); // получение состояния корзины с сервера
  const [get, setGet] = useState(false);
  const { toggleBasket } = useActions(); // add in basket
  useEffect(() => {
    if (!get && data) {
      toggleBasket(data);
      setGet(true);
    }
  }, [data, toggleBasket]);

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

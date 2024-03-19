import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Routes from "./routes";

import { useActions } from "./hooks/useActions";
import { useEffect, useState } from "react";
import { useGetBasketQuery } from "./store/api/getBasket";

export const App: React.FC = () => {
  const { data, isSuccess } = useGetBasketQuery(null); // получение состояния корзины с сервера

  const [get, setGet] = useState(true);
  const { toggleBasket } = useActions(); // add in basket
  useEffect(() => {
    if (get && isSuccess) {
      toggleBasket(data);
      setGet(false);
    }
  }, [isSuccess]);

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

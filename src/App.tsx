import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Routes from "./routes";
import { useGetBasketQuery } from "./store/api/api";
import { useActions } from "./hooks/useActions";
import { useEffect } from "react";

export const App: React.FC = () => {
  const { data  } = useGetBasketQuery(null); // получение состояния корзины с сервера
  const { toggleBasket } = useActions(); // add in basket
  useEffect(() => {
    if (data) {
      data.forEach((el) => {
        toggleBasket({ quantity: el.quantity, id: el.product.id });
      });
    }
  }, [data]);

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

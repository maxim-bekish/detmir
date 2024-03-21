import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";

import { useActions } from "./hooks/useActions";
import { useEffect } from "react";
import { useGetBasketQuery } from "./store/api/getBasket";
// import { useGetOrdersQuery } from "./store/api/getOrders";

export const App: React.FC = () => {
  const { updateBasketInRedux } = useActions(); // add in basket
  localStorage.setItem("step", "1");
  const { data: dataBasket, isSuccess: isSuccessBasket } =
    useGetBasketQuery(null); // получение корзины с сервера
 
  useEffect(() => {
    if (isSuccessBasket) {
      updateBasketInRedux(dataBasket);
    }
  }, [isSuccessBasket, dataBasket]);


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

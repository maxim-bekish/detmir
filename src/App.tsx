import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";

import { useActions } from "./hooks/useActions";
import { useEffect } from "react";
import { useGetBasketQuery } from "./store/api/getBasket";
import { useGetProducts } from "./hooks/useGetProducts";
// import { useGetOrdersQuery } from "./store/api/getOrders";

export const App: React.FC = () => {
  // const { isLoading, ref, isError } = useGetProducts();

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

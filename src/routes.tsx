import { Route, Routes } from "react-router-dom";
import { Product } from "./pages/Products/Products";
import { Orders } from "./pages/Orders/Orders";
import { CardProduct } from "./pages/CardProduct/CardProduct";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Routes>
    <Route path="/" element={<Product />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/cardProduct" element={<CardProduct />} />
  </Routes>
);

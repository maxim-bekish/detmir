import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as basket } from "../store/slices/basket.slice";
import { actions as orders } from "../store/slices/orders.slice";
import { actions as products } from "../store/slices/products.slice";
import { actions as openModal } from "../store/slices/openModal.slice";

const rootActions = {
  ...basket,
  ...orders,
  ...products,
  ...openModal,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

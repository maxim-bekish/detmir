import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as basket } from "../store/slices/basket.slice";
import { actions as orders } from "../store/slices/orders.slice";

const rootActions = {
  ...basket,
  ...orders,
};

export const useActions = () => {
  const dispatch = useDispatch();
  
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

import products from "./slice/product";
import filters from "./slice/filters";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    products,
    filters,
  },
});

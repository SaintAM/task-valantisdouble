import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const asyncFetchData = async ({
  isFilter,
  filterName,
  filterValues,
  currentPage,
}) => {
  try {
    if (isFilter) {
      // Get ids filter
      const getFilterIds = await axios.post("/", {
        action: "filter",
        params: { [filterName]: filterValues },
      });
      const uniqueIds = Array.from(new Set(getFilterIds.data.result));

      // Get itemsFilter
      const getItemsFilter = await axios.post("/", {
        action: "get_items",
        params: { ids: uniqueIds },
      });
      return getItemsFilter.data.result;
    } else {
      const start = currentPage <= 1 ? 1 : currentPage * 50;
      // Get ids
      const getIds = await axios.post("/", {
        action: "get_ids",
        params: { offset: start, limit: 50 },
      });
      const uniqueIds = Array.from(new Set(getIds.data.result));
      // Get items
      const getItems = await axios.post("/", {
        action: "get_items",
        params: { ids: uniqueIds },
      });
      return getItems.data.result;
    }
  } catch (error) {
    console.warn("Ошибка", error);
    await asyncFetchData({
      isFilter,
      filterName,
      filterValues,
      currentPage,
    });
  }
};
export const fetchProducts = createAsyncThunk(
  "users/fetchProducts",
  asyncFetchData
);


const initialState = {
  items: [],
  currentPage: 1,
  status: "idle",
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Data
    builder.addCase(fetchProducts.pending, (state) => {
      state.items = [];
      state.status = "pending";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.items = [];
      state.status = "failed";
    });
  },
});

export const selectProducts = (state) => state.products;

export const { setCurrentPage } = ProductsSlice.actions;

export default ProductsSlice.reducer;

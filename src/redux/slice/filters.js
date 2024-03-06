import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

// может быть передадим currentPage?
export const fetchFilters = createAsyncThunk(
  "users/fetchFilters",
  async ({ filterName }) => {
    try {
      if (filterName) {
        // Get itemsFields
        const itemsFields = await axios.post("/", {
          action: "get_fields",
          params: { field: filterName, offset: 0 },
        });
        const uniqueFields = Array.from(new Set(itemsFields.data.result)).sort(
          (a, b) => a - b
        );
        return uniqueFields;
      }
      return;
    } catch (error) {
      console.warn("Ошибка", error);
      fetchFilters({ filterName });
    }
  }
);

const initialState = {
  fields: [],
  status: "idle",
  filterName: "",
  filterValues: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    setFilterValues: (state, action) => {
      state.filterValues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.fields = [];
      state.status = "pending";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.fields = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.fields = [];
      state.status = "failed";
    });
  },
});

export const selectFilters = (state) => state.filters;

export const { setFilterName, setFilterValues } = filterSlice.actions;

export default filterSlice.reducer;

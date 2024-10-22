import { createReducer } from "@reduxjs/toolkit";

// Initial state for the data reducer
const initialDataState = {
  loading: false,
  allTickets: [],
  allUser: [],
  error: null,
};

// DataReducer: Handles fetching data actions
export const DataReducer = createReducer(initialDataState, (builder) => {
  builder
    .addCase("DATA_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("DATA_SUCCESS", (state, action) => {
      state.loading = false;
      state.allTickets = action.payload?.tickets || [];
      state.allUser = action.payload?.users || [];
    })
    .addCase("DATA_FAILURE", (state, action) => {
      state.loading = false;
      state.allTickets = [];
      state.allUser = [];
      state.error = action.payload || "Failed to fetch data";
    });
});

// Initial state for the select data reducer
const initialSelectState = {
  loading: false,
  selectedData: [],
  user: false,
  message: "",
  error: null,
};

// SelectDataReducer: Handles data selection actions
export const SelectDataReducer = createReducer(initialSelectState, (builder) => {
  builder
    .addCase("SELECT_DATA_REQUEST", (state) => {
      state.loading = true;
      state.selectedData = [];
      state.user = false;
      state.error = null;
    })
    .addCase("SELECT_DATA_SUCCESS", (state, action) => {
      state.loading = false;
      state.selectedData = action.payload?.selectedData || [];
      state.user = action.payload?.user || false;
    })
    .addCase("SELECT_DATA_FAILURE", (state, action) => {
      state.loading = false;
      state.selectedData = [];
      state.message = action.payload?.message || "Error selecting data";
      state.error = action.payload?.error || "Selection failed";
    });
});

import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((req) => req._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequest, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchInsights,
  addInsight,
  deleteInsight,
  toggleFavorite,
} from "../api/insightAPI";

export const getInsights = createAsyncThunk("insights/get", fetchInsights);
export const createInsight = createAsyncThunk("insights/create", addInsight);
export const removeInsight = createAsyncThunk("insights/remove", deleteInsight);
export const markFavorite = createAsyncThunk(
  "insights/favorite",
  toggleFavorite
);

const insightSlice = createSlice({
  name: "insights",
  initialState: { insights: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(getInsights.fulfilled, (state, action) => {
        state.insights = action.payload;
        state.loading = false;
      })
      .addCase(createInsight.fulfilled, (state, action) => {
        state.insights.push(action.payload);
      })
      .addCase(createInsight.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeInsight.fulfilled, (state, action) => {
        state.insights = state.insights.filter(
          (i) => i._id !== action.meta.arg
        );
      })
      .addCase(markFavorite.fulfilled, (state, action) => {
        const index = state.insights.findIndex(
          (i) => i._id === action.payload._id
        );
        if (index !== -1)
          state.insights[index].favorite = action.payload.favorite;
      });
  },
});

export default insightSlice.reducer;

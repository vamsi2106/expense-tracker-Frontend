import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/axios";

interface RecurringExpense {
  id: string;
  expense_id: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  start_date: string;
  end_date: string | null;
}

interface RecurringExpensesState {
  recurringExpenses: RecurringExpense[];
  status: string;
  message: string;
}

const initialState: RecurringExpensesState = {
  recurringExpenses: [],
  status: "idle",
  message: "",
};

export const fetchRecurringExpenses = createAsyncThunk(
  "recurringExpenses/fetchRecurringExpenses",
  async (userId: string) => {
    const response = await axiosInstance.get(`/recurring-expenses`);
    return response.data;
  }
);

const recurringExpensesSlice = createSlice({
  name: "recurringExpenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecurringExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecurringExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recurringExpenses = action.payload as RecurringExpense[];
      })
      .addCase(fetchRecurringExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.message =
          action.error.message || "Failed to fetch recurring expenses";
      });
  },
});

export default recurringExpensesSlice.reducer;

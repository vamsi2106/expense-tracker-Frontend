import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

interface Expense {
  category_name: string;
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  transaction_type: string;
  currency: string;
}

interface ExpensesState {
  expenses: Expense[];
  page_status: string;
  message: string;
  expensesGroupedByCategory: { category: string; amount: number }[];
  expensesGroupedByWeek: { week: string; amount: number }[];
  expensesGroupedByMonth: { month: string; amount: number }[];
  expensesGroupedByDate: { date: string; amount: number }[];
}

const initialState: ExpensesState = {
  expenses: [],
  page_status: "idle",
  message: "",
  expensesGroupedByCategory: [],
  expensesGroupedByWeek: [],
  expensesGroupedByMonth: [],
  expensesGroupedByDate: [],
};

// Fetch expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async ({ userId, params }: { userId: string; params: any }) => {
    const response = await axiosInstance.get(`/tracker/expenses`, { params });
    return response.data;
  }
);

// Create expense
export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async (
    { userId, expenseData }: { userId: string; expenseData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/tracker/expenses`, {
        ...expenseData,
        userId, // Include userId in the request body
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Return error for rejection
    }
  }
);

// Update expense
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (
    {
      userId,
      id,
      updateDetails,
    }: { userId: string; id: string; updateDetails: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/tracker/expenses/${id}`,
        updateDetails
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.delete(`/tracker/expenses/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Grouped expenses by category
export const fetchExpensesGroupedByCategory = createAsyncThunk(
  "expenses/fetchExpensesGroupedByCategory",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/tracker/expenses/filter/group-by-category`
    );
    return response.data;
  }
);

// Grouped expenses by week
export const fetchExpensesGroupedByWeek = createAsyncThunk(
  "expenses/fetchExpensesGroupedByWeek",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/tracker/expenses/filter/group-by-week`
    );
    return response.data;
  }
);

// Grouped expenses by month
export const fetchExpensesGroupedByMonth = createAsyncThunk(
  "expenses/fetchExpensesGroupedByMonth",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/tracker/expenses/filter/group-by-month`
    );
    return response.data;
  }
);

// Grouped expenses by date
export const fetchExpensesGroupedByDate = createAsyncThunk(
  "expenses/fetchExpensesGroupedByDate",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/tracker/expenses/filter/group-by-date`
    );
    return response.data;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.page_status = "loading";
        console.log("Fetching expenses...");
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expenses = action.payload as Expense[];
        console.log("Expenses fetched successfully:", action.payload);
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.error.message || "Failed to fetch expenses";
        console.error("Failed to fetch expenses:", action.error.message);
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload as Expense);
        state.message = "Expense created successfully";
        console.log("Expense created successfully:", action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.page_status = "failed";
        state.message =
          (action.payload as string) || "Failed to create expense";
        console.error("Failed to create expense:", action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.id === (action.payload as Expense).id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload as Expense;
          state.message = "Expense updated successfully";
          console.log("Expense updated successfully:", action.payload);
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.page_status = "failed";
        state.message =
          (action.payload as string) || "Failed to update expense";
        console.error("Failed to update expense:", action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
        state.message = "Expense deleted successfully";
        console.log("Expense deleted successfully:", action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.page_status = "failed";
        state.message =
          (action.payload as string) || "Failed to delete expense";
        console.error("Failed to delete expense:", action.payload);
      })
      .addCase(fetchExpensesGroupedByCategory.fulfilled, (state, action) => {
        state.expensesGroupedByCategory = action.payload as any[];
        console.log(
          "Expenses grouped by category fetched successfully:",
          action.payload
        );
      })
      .addCase(fetchExpensesGroupedByWeek.fulfilled, (state, action) => {
        state.expensesGroupedByWeek = action.payload as any[];
        console.log(
          "Expenses grouped by week fetched successfully:",
          action.payload
        );
      })
      .addCase(fetchExpensesGroupedByMonth.fulfilled, (state, action) => {
        state.expensesGroupedByMonth = action.payload as any[];
        console.log(
          "Expenses grouped by month fetched successfully:",
          action.payload
        );
      })
      .addCase(fetchExpensesGroupedByDate.fulfilled, (state, action) => {
        state.expensesGroupedByDate = action.payload as any[];
        console.log(
          "Expenses grouped by date fetched successfully:",
          action.payload
        );
      });
  },
});

export default expensesSlice.reducer;

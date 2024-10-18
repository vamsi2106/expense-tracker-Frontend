import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExpensesService } from "../services/expense.service";

interface ExpensesState {
  expenses: any[];
  page_status: string;
  message: string | null;
  expense: any | null;
  editModel: boolean;
  expensesFilterdByDay: any;
  expensesFilterdByCategory: any;
  expensesFilterdByWeek: any;
  expensesFilterdByMonth: any;
  expensesFilterdByYear: any;
}

const initialState: ExpensesState = {
  expenses: [],
  page_status: "idle",
  message: null,
  expense: null,
  editModel: false,
  expensesFilterdByDay: null,
  expensesFilterdByCategory: null,
  expensesFilterdByWeek: null,
  expensesFilterdByMonth: null,
  expensesFilterdByYear: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (
    {
      userId,
      params,
    }: {
      userId: string;
      params: { startDate?: string; endDate?: string; filter?: string };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getAllExpenses(userId, params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses"
      );
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async (
    { userId, expenseData }: { userId: string; expenseData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.createExpense(userId, expenseData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.deleteExpense(userId, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete expense"
      );
    }
  }
);

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
      const response = await ExpensesService.updateExpense(
        userId,
        id,
        updateDetails
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update expense"
      );
    }
  }
);

export const getExpenseById = createAsyncThunk(
  "expenses/getExpenseById",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpenseById(userId, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expense by ID"
      );
    }
  }
);

export const fetchExpensesGroupedByDate = createAsyncThunk(
  "expenses/fetchExpensesGroupedByDate",
  async (
    {
      userId,
      offset,
      file_id,
    }: { userId: string; offset: number; file_id?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpensesGroupedByDate(
        userId,
        offset,
        file_id
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses grouped by date"
      );
    }
  }
);

export const fetchExpensesGroupedByCategory = createAsyncThunk(
  "expenses/fetchExpensesGroupedByCategory",
  async (
    {
      userId,
      startDate,
      endDate,
      file_id,
    }: {
      userId: string;
      startDate?: string;
      endDate?: string;
      file_id?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpensesGroupedByCategory(
        userId,
        startDate,
        endDate,
        file_id
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses grouped by category"
      );
    }
  }
);

export const fetchExpensesGroupedByWeek = createAsyncThunk(
  "expenses/fetchExpensesGroupedByWeek",
  async (
    {
      userId,
      month,
      year,
      file_id,
    }: { userId: string; month?: number; year?: number; file_id?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpensesGroupedByWeek(
        userId,
        month,
        year,
        file_id
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses grouped by week"
      );
    }
  }
);

export const fetchExpensesGroupedByMonth = createAsyncThunk(
  "expenses/fetchExpensesGroupedByMonth",
  async (
    {
      userId,
      year,
      file_id,
    }: { userId: string; year?: number; file_id?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpensesGroupedByMonth(
        userId,
        year,
        file_id
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses grouped by month"
      );
    }
  }
);

export const fetchExpensesGroupedByYear = createAsyncThunk(
  "expenses/fetchExpensesGroupedByYear",
  async (
    { userId, file_id }: { userId: string; file_id?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpensesGroupedByYear(
        userId,
        file_id
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses grouped by year"
      );
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    clearError: (state) => {
      state.page_status = "idle";
      state.message = null;
    },
    triggerEditModel: (state) => {
      state.editModel = true;
    },
    closeEditModel: (state) => {
      state.editModel = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expenses = action.payload as any[]; // Explicitly type the payload
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(createExpense.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.page_status = "succeeded";
        state.message = "Expense created successfully";
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(deleteExpense.fulfilled, (state) => {
        state.page_status = "succeeded";
        state.message = "Expense deleted successfully";
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(updateExpense.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(updateExpense.fulfilled, (state) => {
        state.page_status = "succeeded";
        state.message = "Expense updated successfully";
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getExpenseById.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(getExpenseById.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expense = action.payload;
      })
      .addCase(getExpenseById.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(fetchExpensesGroupedByDate.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchExpensesGroupedByDate.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expensesFilterdByDay = action.payload;
      })
      .addCase(fetchExpensesGroupedByDate.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(fetchExpensesGroupedByCategory.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchExpensesGroupedByCategory.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expensesFilterdByCategory = action.payload;
      })
      .addCase(fetchExpensesGroupedByCategory.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(fetchExpensesGroupedByWeek.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchExpensesGroupedByWeek.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expensesFilterdByWeek = action.payload;
      })
      .addCase(fetchExpensesGroupedByWeek.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(fetchExpensesGroupedByMonth.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchExpensesGroupedByMonth.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expensesFilterdByMonth = action.payload;
      })
      .addCase(fetchExpensesGroupedByMonth.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(fetchExpensesGroupedByYear.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchExpensesGroupedByYear.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.expensesFilterdByYear = action.payload;
      })
      .addCase(fetchExpensesGroupedByYear.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      });
  },
});

export const { clearError, triggerEditModel, closeEditModel } =
  expensesSlice.actions;
export default expensesSlice.reducer;

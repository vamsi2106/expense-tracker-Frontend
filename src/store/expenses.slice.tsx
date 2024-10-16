import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ExpenseDetails } from '../Interface/expense.interface';
import { ExpensesService } from '../services/expense.service'; // Import your service
import { PageStatus } from '../utils/pageStatus';

let pageStatusObject = new PageStatus();

interface ExpensesState {
  expenses: ExpenseDetails[];
  page_status: string;
  message: string | null;
  expense: ExpenseDetails | null;
  editModel: boolean;
}

const initialState: ExpensesState = {
  expenses: [],
  page_status: pageStatusObject.initial,
  message: null,
  expense: 
    {
      amount: 0,
      date: '',
      name: "",
      category: "",
    },
  editModel : false
};

// Create an instance of your service
const expensesService = new ExpensesService();

// Async thunk to fetch all expenses
export const fetchExpenses = createAsyncThunk<ExpenseDetails[], void>(
  'expenses/fetchExpenses',
  async () => {
    const response = await expensesService.getAllExpenses(); // Call service method
    return response; // Adjust based on your API response structure
  }
);

// Async thunk to create a new expense
export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expenseData: ExpenseDetails, { rejectWithValue }) => {
    try {
      const response = await expensesService.postExpenseDetails(expenseData);
      return response; // On success, return the data
    } catch (error: any) {
      console.log(error, "error from slice");
      // Return the error message from service to slice
      return rejectWithValue(error || 'An unknown error occurred');
    }
  }
);

// Async thunk to delete an expense by ID
export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await expensesService.deleteExpense(id);
      return response; // On success, return the data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to delete expense');
    }
  }
);

// Async thunk to update an expense by ID
export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, updateDetails }: any, { rejectWithValue }) => {
    try {
      const response = await expensesService.updateExpense(id, updateDetails);
      return response; // On success, return the updated data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update expense');
    }
  }
);

// Async thunk to fetch an expense by ID
export const getExpenseById = createAsyncThunk(
  'expenses/getExpenseById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await expensesService.getExpenseById(id);
      return response; // On success, return the fetched data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch expense by ID');
    }
  }
);

// Create the slice
const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.page_status = pageStatusObject.initial; // Clear error message and reset status
      state.message = null; // Clear error message
    },
    triggerEditModel: (state) => {
      state.editModel = true; // Open the edit modal
    },
    closeEditModel: (state) => {
      state.editModel = false; // Close the edit modal
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.page_status = pageStatusObject.empty
        } else {
          state.page_status = pageStatusObject.success;
        } state.expenses = action.payload;
        state.message = null;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to fetch expenses';
      })
      // Create a new expense
      .addCase(createExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = 'Expense created successfully';
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to create expense';
      })
      // Delete an expense
      .addCase(deleteExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = 'Expense deleted successfully';
        // Optionally, remove the deleted expense from the state
        //state.expenses = state.expenses.filter(expense => expense.id !== action.meta.arg);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to delete expense';
      })
      // Update an expense
      .addCase(updateExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = 'Expense updated successfully';
        // Optionally, update the specific expense in the state
        // const index = state.expenses.findIndex(expense => expense.id === action.meta.arg.id);
        // if (index !== -1) {
        //   state.expenses[index] = action.payload;
        // }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to update expense';
      })
      // Get an expense by ID
      .addCase(getExpenseById.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(getExpenseById.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.expense = action.payload
        // Optionally, add or update the fetched expense in the state
        // const index = state.expenses.findIndex(expense => expense.id === action.meta.arg);
        // if (index === -1) {
        //   state.expenses.push(action.payload);
        // }
      })
      .addCase(getExpenseById.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to fetch expense by ID';
      });
  }

});

// Export the actions and reducer
export const { clearError,closeEditModel,triggerEditModel } = expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;

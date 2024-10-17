// // src/store/expenses.slice.tsx
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { ExpenseDetails } from "../Interface/expense.interface";
// import { ExpensesService } from "../services/expense.service"; // Import your service
// import { PageStatus } from "../utils/pageStatus";

// let pageStatusObject = new PageStatus();

// interface ExpensesState {
//   expenses: ExpenseDetails[];
//   page_status: string;
//   message: string | null;
//   expense: ExpenseDetails | null;
//   editModel: boolean;
//   expensesFilterdByDay: any;
//   expensesFilterdByCategory: any;
//   expensesFilterdByWeek: any;
//   expensesFilterdByMonth: any;
//   expensesFilterdByYear: any;
// }

// const initialState: ExpensesState = {
//   expenses: [],
//   page_status: pageStatusObject.initial,
//   message: null,
//   expense: {
//     amount: 0,
//     date: "",
//     name: "",
//     category: "",
//   },
//   editModel: false,
//   expensesFilterdByDay: null,
//   expensesFilterdByCategory: null,
//   expensesFilterdByWeek: null,
//   expensesFilterdByMonth: null,
//   expensesFilterdByYear: null,
// };

// // Create an instance of your service
// const expensesService = new ExpensesService();

// // Async thunk to fetch all expenses
// export const fetchExpenses = createAsyncThunk<ExpenseDetails[], void>(
//   "expenses/fetchExpenses",
//   async () => {
//     const response = await expensesService.getAllExpenses(); // Call service method
//     return response; // Adjust based on your API response structure
//   }
// );

// // Async thunk to create a new expense
// export const createExpense = createAsyncThunk(
//   "expenses/createExpense",
//   async (expenseData: ExpenseDetails, { rejectWithValue }) => {
//     try {
//       const response = await expensesService.postExpenseDetails(expenseData);
//       return response; // On success, return the data
//     } catch (error: any) {
//       console.log(error, "error from slice");
//       // Return the error message from service to slice
//       return rejectWithValue(error || "An unknown error occurred");
//     }
//   }
// );

// // Async thunk to delete an expense by ID
// export const deleteExpense = createAsyncThunk(
//   "expenses/deleteExpense",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await expensesService.deleteExpense(id);
//       return response; // On success, return the data
//     } catch (error: any) {
//       return rejectWithValue(error || "Failed to delete expense");
//     }
//   }
// );

// // Async thunk to update an expense by ID
// export const updateExpense = createAsyncThunk(
//   "expenses/updateExpense",
//   async ({ id, updateDetails }: any, { rejectWithValue }) => {
//     try {
//       const response = await expensesService.updateExpense(id, updateDetails);
//       return response; // On success, return the updated data
//     } catch (error: any) {
//       return rejectWithValue(error || "Failed to update expense");
//     }
//   }
// );

// // Async thunk to fetch an expense by ID
// export const getExpenseById = createAsyncThunk(
//   "expenses/getExpenseById",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await expensesService.getExpenseById(id);
//       return response; // On success, return the fetched data
//     } catch (error: any) {
//       return rejectWithValue(error || "Failed to fetch expense by ID");
//     }
//   }
// );

// // Group expenses by date
// export const fetchExpensesGroupedByDate = createAsyncThunk(
//   "expenses/fetchExpensesGroupedByDate",
//   async (
//     { offset, file_id }: { offset: number; file_id?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await expensesService.getExpensesGroupedByDate(
//         offset,
//         file_id
//       );
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(
//         error || "Failed to fetch expenses grouped by date"
//       );
//     }
//   }
// );

// // Group expenses by category
// export const fetchExpensesGroupedByCategory = createAsyncThunk(
//   "expenses/fetchExpensesGroupedByCategory",
//   async (
//     {
//       startDate,
//       endDate,
//       file_id,
//     }: { startDate?: string; endDate?: string; file_id?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await expensesService.getExpensesGroupedByCategory(
//         file_id,
//         startDate,
//         endDate
//       );
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(
//         error || "Failed to fetch expenses grouped by category"
//       );
//     }
//   }
// );

// // Group expenses by week
// export const fetchExpensesGroupedByWeek = createAsyncThunk(
//   "expenses/fetchExpensesGroupedByWeek",
//   async (
//     {
//       month,
//       year,
//       file_id,
//     }: { month?: number; year?: number; file_id?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await expensesService.getExpensesGroupedByWeek(
//         month,
//         year,
//         file_id
//       );
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(
//         error || "Failed to fetch expenses grouped by week"
//       );
//     }
//   }
// );

// // Group expenses by month
// export const fetchExpensesGroupedByMonth = createAsyncThunk(
//   "expenses/fetchExpensesGroupedByMonth",
//   async (
//     { year, file_id }: { year?: number; file_id?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await expensesService.getExpensesGroupedByMonth(
//         file_id,
//         year
//       );
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(
//         error || "Failed to fetch expenses grouped by month"
//       );
//     }
//   }
// );

// // Group expenses by year
// export const fetchExpensesGroupedByYear = createAsyncThunk(
//   "expenses/fetchExpensesGroupedByYear",
//   async ({ file_id }: { file_id?: string }, { rejectWithValue }) => {
//     try {
//       const response = await expensesService.getExpensesGroupedByYear(file_id);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(
//         error || "Failed to fetch expenses grouped by year"
//       );
//     }
//   }
// );

// // Create the slice
// const expensesSlice = createSlice({
//   name: "expenses",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.page_status = pageStatusObject.initial; // Clear error message and reset status
//       state.message = null; // Clear error message
//     },
//     triggerEditModel: (state) => {
//       state.editModel = true; // Open the edit modal
//     },
//     closeEditModel: (state) => {
//       state.editModel = false; // Close the edit modal
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // Fetch all expenses
//       .addCase(fetchExpenses.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(fetchExpenses.fulfilled, (state, action) => {
//         if (action.payload.length === 0) {
//           state.page_status = pageStatusObject.empty;
//         } else {
//           state.page_status = pageStatusObject.success;
//         }
//         state.expenses = action.payload;
//         state.message = null;
//       })
//       .addCase(fetchExpenses.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) || "Failed to fetch expenses";
//       })
//       // Create a new expense
//       .addCase(createExpense.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(createExpense.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.message = "Expense created successfully";
//       })
//       .addCase(createExpense.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) || "Failed to create expense";
//       })
//       // Delete an expense
//       .addCase(deleteExpense.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(deleteExpense.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.message = "Expense deleted successfully";
//         // Optionally, remove the deleted expense from the state
//         //state.expenses = state.expenses.filter(expense => expense.id !== action.meta.arg);
//       })
//       .addCase(deleteExpense.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) || "Failed to delete expense";
//       })
//       // Update an expense
//       .addCase(updateExpense.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(updateExpense.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.message = "Expense updated successfully";
//         // Optionally, update the specific expense in the state
//         // const index = state.expenses.findIndex(expense => expense.id === action.meta.arg.id);
//         // if (index !== -1) {
//         //   state.expenses[index] = action.payload;
//         // }
//       })
//       .addCase(updateExpense.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) || "Failed to update expense";
//       })
//       // Get an expense by ID
//       .addCase(getExpenseById.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(getExpenseById.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.expense = action.payload;
//         // Optionally, add or update the fetched expense in the state
//         // const index = state.expenses.findIndex(expense => expense.id === action.meta.arg);
//         // if (index === -1) {
//         //   state.expenses.push(action.payload);
//         // }
//       })
//       .addCase(getExpenseById.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) || "Failed to fetch expense by ID";
//       })
//       //query thunks
//       // Fetch expenses grouped by date
//       .addCase(fetchExpensesGroupedByDate.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(fetchExpensesGroupedByDate.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.expensesFilterdByDay = action.payload;
//         state.message = null;
//       })
//       .addCase(fetchExpensesGroupedByDate.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) ||
//           "Failed to fetch expenses grouped by date";
//       })
//       // Fetch expenses grouped by category
//       .addCase(fetchExpensesGroupedByCategory.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(fetchExpensesGroupedByCategory.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.expensesFilterdByCategory = action.payload;
//         state.message = null;
//       })
//       .addCase(fetchExpensesGroupedByCategory.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) ||
//           "Failed to fetch expenses grouped by category";
//       })
//       // Fetch expenses grouped by week
//       .addCase(fetchExpensesGroupedByWeek.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(fetchExpensesGroupedByWeek.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.expensesFilterdByWeek = action.payload;
//         state.message = null;
//       })
//       .addCase(fetchExpensesGroupedByWeek.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) ||
//           "Failed to fetch expenses grouped by week";
//       })
//       // Fetch expenses grouped by month
//       .addCase(fetchExpensesGroupedByMonth.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(fetchExpensesGroupedByMonth.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.expensesFilterdByMonth = action.payload;
//         state.message = null;
//       })
//       .addCase(fetchExpensesGroupedByMonth.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) ||
//           "Failed to fetch expenses grouped by month";
//       })
//       // Fetch expenses grouped by year
//       .addCase(fetchExpensesGroupedByYear.pending, (state) => {
//         state.page_status = pageStatusObject.loading;
//       })
//       .addCase(fetchExpensesGroupedByYear.fulfilled, (state, action) => {
//         state.page_status = pageStatusObject.success;
//         state.expensesFilterdByYear = action.payload;
//         state.message = null;
//       })
//       .addCase(fetchExpensesGroupedByYear.rejected, (state, action) => {
//         state.page_status = pageStatusObject.error;
//         state.message =
//           (action.payload as string) ||
//           "Failed to fetch expenses grouped by year";
//       });
//   },
// });

// // Export the actions and reducer
// export const { clearError, closeEditModel, triggerEditModel } =
//   expensesSlice.actions;
// export const expensesReducer = expensesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExpenseDetails } from "../Interface/expense.interface";
import { ExpensesService } from "../services/expense.service"; // Import your service
import { PageStatus } from "../utils/pageStatus";

let pageStatusObject = new PageStatus();

interface ExpensesState {
  expenses: ExpenseDetails[];
  page_status: string;
  message: string | null;
  expense: ExpenseDetails | null;
  editModel: boolean;
  expensesFilterdByDay: any;
  expensesFilterdByCategory: any;
  expensesFilterdByWeek: any;
  expensesFilterdByMonth: any;
  expensesFilterdByYear: any;
}

const initialState: ExpensesState = {
  expenses: [],
  page_status: pageStatusObject.initial,
  message: null,
  expense: {
    amount: 0,
    date: "",
    name: "",
    category: "",
  },
  editModel: false,
  expensesFilterdByDay: null,
  expensesFilterdByCategory: null,
  expensesFilterdByWeek: null,
  expensesFilterdByMonth: null,
  expensesFilterdByYear: null,
};

// Async thunk to fetch all expenses
export const fetchExpenses: any = createAsyncThunk<
  ExpenseDetails[],
  {
    userId: string;
    params: { startDate?: string; endDate?: string; filter?: string };
  }
>("expenses/fetchExpenses", async ({ userId, params }, { rejectWithValue }) => {
  try {
    const response = await ExpensesService.getAllExpenses(userId, params); // Call service method
    return response as ExpenseDetails[]; // Explicitly type the return value
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch expenses");
  }
});
// Async thunk to create a new expense
export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async (
    { userId, expenseData }: { userId: string; expenseData: ExpenseDetails },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.createExpense(userId, expenseData);
      return response; // On success, return the data
    } catch (error: any) {
      console.log(error, "error from slice");
      // Return the error message from service to slice
      return rejectWithValue(error || "An unknown error occurred");
    }
  }
);

// Async thunk to delete an expense by ID
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.deleteExpense(userId, id);
      return response; // On success, return the data
    } catch (error: any) {
      return rejectWithValue(error || "Failed to delete expense");
    }
  }
);

// Async thunk to update an expense by ID
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (
    {
      userId,
      id,
      updateDetails,
    }: { userId: string; id: string; updateDetails: ExpenseDetails },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.updateExpense(
        userId,
        id,
        updateDetails
      );
      return response; // On success, return the updated data
    } catch (error: any) {
      return rejectWithValue(error || "Failed to update expense");
    }
  }
);

// Async thunk to fetch an expense by ID
export const getExpenseById = createAsyncThunk(
  "expenses/getExpenseById",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await ExpensesService.getExpenseById(userId, id);
      return response; // On success, return the fetched data
    } catch (error: any) {
      return rejectWithValue(error || "Failed to fetch expense by ID");
    }
  }
);

// Group expenses by date
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
        error || "Failed to fetch expenses grouped by date"
      );
    }
  }
);

// Group expenses by category
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
        error || "Failed to fetch expenses grouped by category"
      );
    }
  }
);

// Group expenses by week
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
        error || "Failed to fetch expenses grouped by week"
      );
    }
  }
);

// Group expenses by month
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
        error || "Failed to fetch expenses grouped by month"
      );
    }
  }
);

// Group expenses by year
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
        error || "Failed to fetch expenses grouped by year"
      );
    }
  }
);

// Create the slice
const expensesSlice = createSlice({
  name: "expenses",
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
          state.page_status = pageStatusObject.empty;
        } else {
          state.page_status = pageStatusObject.success;
        }
        state.expenses = action.payload;
        state.message = null;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) || "Failed to fetch expenses";
      })
      // Create a new expense
      .addCase(createExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = "Expense created successfully";
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) || "Failed to create expense";
      })
      // Delete an expense
      .addCase(deleteExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = "Expense deleted successfully";
        // Optionally, remove the deleted expense from the state
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.meta.arg.id
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) || "Failed to delete expense";
      })
      // Update an expense
      .addCase(updateExpense.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = "Expense updated successfully";
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) || "Failed to update expense";
      })
      // Get an expense by ID
      .addCase(getExpenseById.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(getExpenseById.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
      })
      .addCase(getExpenseById.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) || "Failed to fetch expense by ID";
      })
      // Fetch expenses grouped by date
      .addCase(fetchExpensesGroupedByDate.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchExpensesGroupedByDate.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.expensesFilterdByDay = action.payload;
        state.message = null;
      })
      .addCase(fetchExpensesGroupedByDate.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) ||
          "Failed to fetch expenses grouped by date";
      })
      // Fetch expenses grouped by category
      .addCase(fetchExpensesGroupedByCategory.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchExpensesGroupedByCategory.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.expensesFilterdByCategory = action.payload;
        state.message = null;
      })
      .addCase(fetchExpensesGroupedByCategory.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) ||
          "Failed to fetch expenses grouped by category";
      })
      // Fetch expenses grouped by week
      .addCase(fetchExpensesGroupedByWeek.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchExpensesGroupedByWeek.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.expensesFilterdByWeek = action.payload;
        state.message = null;
      })
      .addCase(fetchExpensesGroupedByWeek.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) ||
          "Failed to fetch expenses grouped by week";
      })
      // Fetch expenses grouped by month
      .addCase(fetchExpensesGroupedByMonth.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchExpensesGroupedByMonth.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.expensesFilterdByMonth = action.payload;
        state.message = null;
      })
      .addCase(fetchExpensesGroupedByMonth.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) ||
          "Failed to fetch expenses grouped by month";
      })
      // Fetch expenses grouped by year
      .addCase(fetchExpensesGroupedByYear.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchExpensesGroupedByYear.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.expensesFilterdByYear = action.payload;
        state.message = null;
      })
      .addCase(fetchExpensesGroupedByYear.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message =
          (action.payload as string) ||
          "Failed to fetch expenses grouped by year";
      });
  },
});

// Export the actions and reducer
export const { clearError, closeEditModel, triggerEditModel } =
  expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;

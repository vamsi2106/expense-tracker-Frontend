import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
}

interface CategoriesState {
  categories: Category[];
  status: string;
  message: string;
}

const initialState: CategoriesState = {
  categories: [],
  status: "idle",
  message: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (userId: string) => {
    const response = await axiosInstance.get(`/expenses/categories/users`);
    return response.data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ userId, categoryData }: { userId: string; categoryData: any }) => {
    const response = await axiosInstance.post(
      `/expenses/categories`,
      categoryData
    );
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ userId, id }: { userId: string; id: string }) => {
    await axiosInstance.delete(`/expenses/categories/${id}`);
    return id;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload as Category[];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message || "Failed to fetch categories";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload as Category);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      });
  },
});

export default categoriesSlice.reducer;

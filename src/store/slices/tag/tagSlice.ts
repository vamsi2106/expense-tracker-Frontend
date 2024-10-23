import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

interface Tag {
  id: string;
  tag_name: string;
}

interface TagsState {
  tags: Tag[];
  status: string;
  message: string;
}

const initialState: TagsState = {
  tags: [],
  status: "idle",
  message: "",
};

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (userId: string) => {
    const response = await axiosInstance.get(`/expenses/tags`);
    return response.data;
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload as Tag[];
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message || "Failed to fetch tags";
      });
  },
});

export default tagsSlice.reducer;

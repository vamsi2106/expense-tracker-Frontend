import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axios";

interface File {
  id: string;
  name: string;
  uploadDate: string;
}

interface FilesState {
  files: File[];
  page_status: string;
  message: string;
}

const initialState: FilesState = {
  files: [],
  page_status: "idle",
  message: "",
};

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async ({ userId }: { userId: string }) => {
    const response = await axiosInstance.get(`/users/${userId}/files`);
    return response.data;
  }
);

export const createFile = createAsyncThunk(
  "files/createFile",
  async ({ userId, fileData }: { userId: string; fileData: FormData }) => {
    const response = await axiosInstance.post(
      `/users/${userId}/files/upload`,
      fileData
    );
    return response.data;
  }
);

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async ({ userId, id }: { userId: string; id: string }) => {
    await axiosInstance.delete(`/users/${userId}/files/delete/${id}`);
    return id;
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.files = action.payload as File[];
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.error.message || "Failed to fetch files";
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.files.push(action.payload as File);
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter((file) => file.id !== action.payload);
      });
  },
});

export default filesSlice.reducer;

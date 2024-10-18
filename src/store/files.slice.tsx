import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FileService } from "../services/file.services";

interface FilesState {
  files: any[];
  page_status: string;
  message: string | null;
  file: any | null;
}

const initialState: FilesState = {
  files: [],
  page_status: "idle",
  message: null,
  file: null,
};

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await FileService.getAllFiles(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch files");
    }
  }
);

export const createFile = createAsyncThunk(
  "files/createFile",
  async (
    { userId, fileData }: { userId: string; fileData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await FileService.uploadFile(userId, fileData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to upload file");
    }
  }
);

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await FileService.deleteFile(userId, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete file");
    }
  }
);

export const getFileById = createAsyncThunk(
  "files/getFileById",
  async (
    { userId, id }: { userId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await FileService.getFileById(userId, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch file by ID"
      );
    }
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    clearError: (state) => {
      state.page_status = "idle";
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.files = action.payload as any[]; // Explicitly type the payload
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(createFile.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(createFile.fulfilled, (state) => {
        state.page_status = "succeeded";
        state.message = "File uploaded successfully";
      })
      .addCase(createFile.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(deleteFile.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.page_status = "succeeded";
        state.message = "File deleted successfully";
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      })
      .addCase(getFileById.pending, (state) => {
        state.page_status = "loading";
      })
      .addCase(getFileById.fulfilled, (state, action) => {
        state.page_status = "succeeded";
        state.file = action.payload;
      })
      .addCase(getFileById.rejected, (state, action) => {
        state.page_status = "failed";
        state.message = action.payload as string;
      });
  },
});

export const { clearError } = filesSlice.actions;
export default filesSlice.reducer;

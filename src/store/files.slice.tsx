// src/store/files.slice.tsx 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FileService } from '../services/file.services'; // Import your service
import { PageStatus } from '../utils/pageStatus';

let pageStatusObject = new PageStatus();

interface FileDetails {
  id: string;
  name: string;
  url: string;
  // Add other properties as necessary
}

interface FilesState {
  files: FileDetails[];
  page_status: string;
  message: string | null;
  file: FileDetails | null;
  editModel: boolean;
}

const initialState: FilesState = {
  files: [],
  page_status: pageStatusObject.initial,
  message: null,
  file: null,
  editModel: false,
};

// Create an instance of your service
const filesService = new FileService();

// Async thunk to fetch all files
export const fetchFiles = createAsyncThunk<FileDetails[], void>(
  'files/fetchFiles',
  async () => {
    const response = await filesService.getAllFiles();
    return response; // Adjust based on your API response structure
  }
);

// Async thunk to create a new file
// Updated createFile function
export const createFile = createAsyncThunk(
    'files/createFile',
    async (fileData: FormData, { rejectWithValue }) => {
      try {
        // Here, we are passing fileData directly as it is already of type FormData
        const response = await filesService.uploadFile(fileData); // No need to specify type here
        return response; // On success, return the data
      } catch (error: any) {
        console.log(error, "error from slice");
        return rejectWithValue(error || 'An unknown error occurred');
      }
    }
  );
  
  // Updated uploadFile function in the service
  
  

// Async thunk to delete a file by ID
export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await filesService.deleteFile(id);
      return response; // On success, return the data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to delete file');
    }
  }
);

// Async thunk to fetch a file by ID
export const getFileById = createAsyncThunk(
  'files/getFileById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await filesService.getFileById(id);
      return response; // On success, return the fetched data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch file by ID');
    }
  }
);

// Create the slice
const filesSlice = createSlice({
  name: 'files',
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
      // Fetch all files
      .addCase(fetchFiles.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.page_status = pageStatusObject.empty;
        } else {
          state.page_status = pageStatusObject.success;
        }
        state.files = action.payload;
        state.message = null;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to fetch files';
      })
      // Create a new file
      .addCase(createFile.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = 'File uploaded successfully';
        state.files.push(action.payload); // Optionally add new file to the state
      })
      .addCase(createFile.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to upload file';
      })
      // Delete a file
      .addCase(deleteFile.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.message = 'File deleted successfully';
        // Remove the deleted file from the state
        state.files = state.files.filter(file => file.id !== action.meta.arg);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to delete file';
      })
      // Get a file by ID
      .addCase(getFileById.pending, (state) => {
        state.page_status = pageStatusObject.loading;
      })
      .addCase(getFileById.fulfilled, (state, action) => {
        state.page_status = pageStatusObject.success;
        state.file = action.payload; // Store the fetched file details
      })
      .addCase(getFileById.rejected, (state, action) => {
        state.page_status = pageStatusObject.error;
        state.message = action.payload as string || 'Failed to fetch file by ID';
      });
  }
});

// Export the actions and reducer
export const { clearError, closeEditModel, triggerEditModel } = filesSlice.actions;
export const filesReducer = filesSlice.reducer;

// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import usersListReducer from "./usersListSlice"; // Your users list slice
import { expensesReducer } from "./expenses.slice";
import { filesReducer } from "./files.slice";

// Define the store's dispatch type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Add this line

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    usersList: usersListReducer,
    expenses: expensesReducer, // Add your slices here
    files : filesReducer// Add your new slice here
  },
});

export const persistor = persistStore(store);
export default store;

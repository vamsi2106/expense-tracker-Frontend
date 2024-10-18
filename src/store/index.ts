import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import expensesReducer from "./expenses.slice";
import filesReducer from "./files.slice";
import usersListReducer from "./usersListSlice"; // Ensure this is imported

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    expenses: expensesReducer,
    files: filesReducer,
    usersList: usersListReducer, // Ensure this is added
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

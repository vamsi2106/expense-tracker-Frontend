// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user/userSlice";
import usersListReducer from "./slices/user/usersListSlice";
import expenseReducer from "./slices/expenses/expenses.slice";
import categoryReducer from "./slices/category/categorySlice";
import tagReducer from "./slices/tag/tagSlice";
import filesReducer from "./slices/file/fileSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    usersList: usersListReducer,
    expenses: expenseReducer,
    categories: categoryReducer,
    tags: tagReducer,
    files: filesReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

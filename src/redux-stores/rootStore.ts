import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {AddEditTransactionReducer} from "../components/AddEditTransaction/AddEditTransaction.slice";
import {HomepageSliceReducer} from "../components/Homepage/Homepage.slice";
import {RootSliceReducer} from "./root.slice";
import {TransactionsReducer} from "../components/Transactions/Transaction.slice";
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const config = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const combinedReducer = combineReducers({
  root: RootSliceReducer,
  homepage: HomepageSliceReducer,
  transactions: TransactionsReducer,
  addEditTransaction: AddEditTransactionReducer,
})

const persisted = persistReducer(config, combinedReducer);

export const rootStore = configureStore({
  reducer: persisted,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const useAppDispatch = () => useDispatch();
export type RootState = ReturnType<typeof rootStore.getState>

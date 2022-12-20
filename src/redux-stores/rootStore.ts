import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {AddEditTransactionReducer} from "../components/AddEditTransaction/AddEditTransaction.slice";
import {HomepageSliceReducer} from "../components/Homepage/Homepage.slice";
import {RootSliceReducer} from "./root.slice";

export const rootStore = configureStore({
  reducer: {
    root: RootSliceReducer,
    homepage: HomepageSliceReducer,
    addEditTransaction: AddEditTransactionReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export type RootState = ReturnType<typeof rootStore.getState>

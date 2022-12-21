import {Category} from "../custom-types/Category";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../custom-types/Transaction";

export interface RootStateSlice {
  transactions: Transaction[],
  categories: Category[],
}

const initialState: RootStateSlice = {
  transactions: [],
  categories: [],
}

const rootSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    newTransaction: (state: RootStateSlice, {payload}: PayloadAction<Transaction>) => {
      state.transactions.push(payload);
    },
    setTransactions: (state: RootStateSlice, {payload}:PayloadAction<Transaction[]>)=>{
      state.transactions = [...state.transactions, ...payload];
    },
    setCategories: (state: RootStateSlice, {payload}:PayloadAction<Category[]>)=>{
      state.categories = [...state.categories, ...payload];
    },
  }
})

export const RootSlice = rootSlice.actions;
export const RootSliceReducer = rootSlice.reducer;
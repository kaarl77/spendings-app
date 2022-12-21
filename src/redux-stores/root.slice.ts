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
    setTransactions: (state: RootStateSlice, {payload}: PayloadAction<Transaction[]>) => {
      state.transactions = [...state.transactions, ...payload];
    },
    setCategories: (state: RootStateSlice, {payload}: PayloadAction<Category[]>) => {
      state.categories = [...state.categories, ...payload];
    },
    editTransaction: (state: RootStateSlice, {payload}: PayloadAction<Transaction>) => {
      const transactionToBeModifiedIndex = state.transactions.findIndex((t) => t.id === payload.id);
      const transactionsBeforeTarget = [...state.transactions].slice(0, transactionToBeModifiedIndex);
      const transactionsAfterTarget = [...state.transactions].slice(transactionToBeModifiedIndex + 1);
      state.transactions = [...transactionsBeforeTarget, payload, ...transactionsAfterTarget];
    },
    removeTransaction: (state:RootStateSlice, {payload}:PayloadAction<Transaction|undefined>) => {
      state.transactions = [...state.transactions.filter((item) => item.id !== payload?.id)];
    },
  }
})

export const RootSlice = rootSlice.actions;
export const RootSliceReducer = rootSlice.reducer;
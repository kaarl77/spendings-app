import {Category} from "../custom-types/Category";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../custom-types/Transaction";
import {StringToDate} from "../utils/date-utils";

export interface RootStateSlice {
  transactions: Transaction[],
  filteredTransactionsByDate: Transaction[][],
  uniqueDatesSorted: string[],
  categories: Category[],
}

const initialState: RootStateSlice = {
  transactions: [],
  filteredTransactionsByDate: [[]],
  uniqueDatesSorted: [],
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
      state.transactions = [...payload];
    },
    setCategories: (state: RootStateSlice, {payload}: PayloadAction<Category[]>) => {
      state.categories = [...payload];
    },
    editTransaction: (state: RootStateSlice, {payload}: PayloadAction<Transaction>) => {
      const transactionToBeModifiedIndex = state.transactions.findIndex((t) => t.id === payload.id);
      const transactionsBeforeTarget = [...state.transactions].slice(0, transactionToBeModifiedIndex);
      const transactionsAfterTarget = [...state.transactions].slice(transactionToBeModifiedIndex + 1);
      state.transactions = [...transactionsBeforeTarget, payload, ...transactionsAfterTarget];
    },
    removeTransaction: (state: RootStateSlice, {payload}: PayloadAction<Transaction | undefined>) => {
      state.transactions = [...state.transactions.filter((item) => item.id !== payload?.id)];
    },
    setFilteredTransactionsByDate: (state: RootStateSlice) => {
      for (const date of state.uniqueDatesSorted) {
        state.filteredTransactionsByDate[state.uniqueDatesSorted.findIndex((d) => date === d)] = [...state.transactions.filter((t) => t.date === date)];
      }
    },
    setUniqueDates: (state: RootStateSlice) => {
      const transactions = state.transactions;
      const sortedDates = transactions.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
      const datesSet = new Set(sortedDates);
      state.uniqueDatesSorted = [...Array.from(datesSet)];
    },
    resetState: (state: RootStateSlice) => {
      state = {...initialState};
    }
  }
})

export const RootSlice = rootSlice.actions;
export const RootSliceReducer = rootSlice.reducer;

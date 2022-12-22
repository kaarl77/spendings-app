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
    removeTransaction: (state: RootStateSlice, {payload}: PayloadAction<Transaction | undefined>) => {
      state.transactions = [...state.transactions.filter((item) => item.id !== payload?.id)];
    },
    setFilteredTransactionsByDate: (state: RootStateSlice) => {
      console.log("getting al dates");
      // for (let i = 0; i < nrOfDates; i++) {
      //   //state.filteredTransactionsByDate[i].filter((transaction)=> transaction.date === date);
      //   state.filteredTransactionsByDate[i] = [...state.transactions.filter((transaction)=>transaction.date === date)]
      // }
      for (const date of state.uniqueDatesSorted) {
        console.log(date);
        console.log("in for")
        state.filteredTransactionsByDate[state.uniqueDatesSorted.findIndex((d) => date === d)] = [...state.transactions.filter((t) => t.date === date)];
      }
      console.log(state.filteredTransactionsByDate);
    },
    setUniqueDates: (state: RootStateSlice) => {
      console.log("getting unique dates")
      const transactions = state.transactions;
      console.log(transactions)
      const sortedDates = transactions.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
      const datesSet = new Set(sortedDates);
      state.uniqueDatesSorted = [...Array.from(datesSet)];
      console.log(state.uniqueDatesSorted);
    }
  }
})

export const RootSlice = rootSlice.actions;
export const RootSliceReducer = rootSlice.reducer;

// getFilteredTransactionsByDate: (state: TransactionsSliceState, {payload}: PayloadAction<FilteredTransactionsPayload>) => {
//   const aux = payload.transactions.filter((transaction) => transaction.date === payload.date);
//   state.filteredTransactionsByDate = [...aux];
//   console.log(state.filteredTransactionsByDate)
// },
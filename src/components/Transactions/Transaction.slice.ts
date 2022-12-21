import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";

interface TransactionsSliceState {
  sortedTransactionDatesArray: string[],
  filteredTransactionsByDate: Transaction[],
}

interface FilteredTransactionsPayload {
  transactions: Transaction[],
  date: string | "",
}

const initialState: TransactionsSliceState = {
  sortedTransactionDatesArray: [],
  filteredTransactionsByDate: [],
}

const transactionSlice = createSlice({
  name: "addEditTransaction",
  initialState: initialState,
  reducers: {
    getSortedTransactionDates: (state: TransactionsSliceState, {payload}: PayloadAction<Transaction[]>) => {
      const aux = payload.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
      state.sortedTransactionDatesArray = [...aux];
    },
    getFilteredTransactionsByDate: (state: TransactionsSliceState, {payload}: PayloadAction<FilteredTransactionsPayload>) => {
      state.filteredTransactionsByDate = [...payload.transactions.filter((transaction) => transaction.date === payload.date)];
      console.log(state.filteredTransactionsByDate)
    },
  }
})

export const TransactionsReducer = transactionSlice.reducer;
export const TransactionsSlice = transactionSlice.actions;


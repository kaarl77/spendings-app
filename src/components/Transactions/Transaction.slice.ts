import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";

interface TransactionsSliceState {
  uniqueDatesSorted: string[],
  filteredTransactionsByDate: Transaction[],
}

interface FilteredTransactionsPayload {
  transactions: Transaction[],
  date: string,
}

const initialState: TransactionsSliceState = {
  uniqueDatesSorted: [],
  filteredTransactionsByDate: [],
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    getSortedTransactionDates: (state: TransactionsSliceState, {payload}: PayloadAction<Transaction[]>) => {
      const sortedDates = payload.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
      const datesSet = new Set(sortedDates);
      state.uniqueDatesSorted = [...Array.from(datesSet)];
    }
  }
})

export const TransactionsReducer = transactionsSlice.reducer;
export const TransactionsSlice = transactionsSlice.actions;



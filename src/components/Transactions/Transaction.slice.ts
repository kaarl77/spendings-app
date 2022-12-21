import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";

//Sorted transactions dates, in a set, not array
interface TransactionsSliceState {
  sortedTransactionDatesArray: string[],
}

const initialState: TransactionsSliceState = {
  sortedTransactionDatesArray: [],
}

const transactionSlice = createSlice({
  name: "addEditTransaction",
  initialState: initialState,
  reducers: {
    getSortedTransactionDates: (state:TransactionsSliceState, {payload}:PayloadAction<Transaction[]>) => {
      let aux = payload.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
      state.sortedTransactionDatesArray = [...aux];
    },
  }
})

export const TransactionsReducer = transactionSlice.reducer;
export const TransactionsSlice = transactionSlice.actions;


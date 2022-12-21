import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";
import {TimePeriod} from "../../common-components/TimePeriod/TimePeriodSelector";
import moment from "moment/moment";

export interface HomepageSliceState {
  latest5Transactions: Transaction[],
  transactionsFilteredByTimePeriod: Transaction[],
  totalSpentInTimePeriod: number,
}

interface TransactionsByTimePeriod {
  timePeriod: TimePeriod,
  transactions: Transaction[],

}

const initialState: HomepageSliceState = {
  latest5Transactions: [],
  transactionsFilteredByTimePeriod: [],
  totalSpentInTimePeriod: 0,
};


const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    getLatest5Transactions: (state:HomepageSliceState, {payload}:PayloadAction<Transaction[]>)=>{
      const aux = [...payload].sort((a, b) => StringToDate(a.date).valueOf() < StringToDate(b.date).valueOf() ? 1 : -1).slice(0, 5);
      state.latest5Transactions = [...aux];
    },
    getTransactionsFilteredByTimePeriod: (state:HomepageSliceState, {payload}:PayloadAction<TransactionsByTimePeriod>)=>{
      if(payload.timePeriod === TimePeriod.month){
        state.transactionsFilteredByTimePeriod = [...getTransactionsForThisMonth(payload.transactions)];
      }
      else
        state.transactionsFilteredByTimePeriod = [...getTransactionsForThisWeek(payload.transactions)];
    },
    getTotalSpentInTimePeriod: (state: HomepageSliceState)=>{
      let x = 0;
      for(const element of state.transactionsFilteredByTimePeriod) {
        x+= element.value;
      }
      state.totalSpentInTimePeriod = x;
    }
  }
});

function getTransactionsForThisMonth(transactions: Transaction[]) {
  return transactions.filter((transaction) => moment().month() === StringToDate(transaction.date).month())
}

function getTransactionsForThisWeek(transactions: Transaction[]) {
  return transactions.filter((transaction) => moment().week() === StringToDate(transaction.date).week())
}


export const HomepageSliceReducer = homepageSlice.reducer;
export const HomepageSlice = homepageSlice.actions;
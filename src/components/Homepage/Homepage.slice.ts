import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";
//ToDo add filtered transactions, top spendings, totalSpent
export interface HomepageSliceState {
  latest5Transactions: Transaction[],
}

const initialState: HomepageSliceState = {
  latest5Transactions: [],
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    getLatest5Transactions: (state:HomepageSliceState, {payload}:PayloadAction<Transaction[]>)=>{
      const aux = [...payload].sort((a, b) => StringToDate(a.date).valueOf() < StringToDate(b.date).valueOf() ? 1 : -1).slice(0, 5);
      state.latest5Transactions = [...aux];
    },
  }
});

export const HomepageSliceReducer = homepageSlice.reducer;
export const HomepageSlice = homepageSlice.actions;
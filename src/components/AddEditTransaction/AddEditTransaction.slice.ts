import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../custom-types/Transaction";

interface AddEditTransactionSliceState {
  id: number;
  value: string;
  note: string;
  categoryId: number;
  date: string;
  initialTransaction?: Transaction;
}

const initialState: AddEditTransactionSliceState = {
  id: -1,
  value: "",
  note: "",
  categoryId: -1,
  date: "",
  initialTransaction: undefined,
};

const addEditTransactionSlice = createSlice({
  name: "addEditTransaction",
  initialState: initialState,
  reducers: {
    setValue: (
      state: AddEditTransactionSliceState,
      { payload }: PayloadAction<string>
    ) => {
      state.value = payload;
    },
    setNote: (
      state: AddEditTransactionSliceState,
      { payload }: PayloadAction<string>
    ) => {
      state.note = payload;
    },
    setCategoryId: (
      state: AddEditTransactionSliceState,
      { payload }: PayloadAction<number>
    ) => {
      state.categoryId = payload;
    },
    setDate: (
      state: AddEditTransactionSliceState,
      { payload }: PayloadAction<string>
    ) => {
      state.date = payload;
    },
    setInitialTransaction: (
      state: AddEditTransactionSliceState,
      { payload }: PayloadAction<Transaction>
    ) => {
      state.initialTransaction = payload;
      state.note = payload.note;
      state.value = payload.value.toString(); //TODO synchronize Transaction.value types ( either String or Number everywhere )
      state.categoryId = payload.categoryid;
      state.date = payload.date;
      state.id = payload.id;
    },
    resetToInitialState: (state: AddEditTransactionSliceState) => {
      if (state.initialTransaction) {
        state.date = state.initialTransaction.date;
        state.note = state.initialTransaction.note;
        state.value = state.initialTransaction.value.toString();
        state.categoryId = state.initialTransaction.categoryid;
        state.initialTransaction = initialState.initialTransaction;
      } else {
        state.date = initialState.date;
        state.note = initialState.note;
        state.value = initialState.value;
        state.categoryId = initialState.categoryId;
      }
    },
  },
});

export const AddEditTransactionReducer = addEditTransactionSlice.reducer;
export const AddEditTransactionSlice = addEditTransactionSlice.actions;

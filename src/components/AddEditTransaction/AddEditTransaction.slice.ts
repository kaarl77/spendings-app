import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "../../custom-types/Transaction";
import {Category} from "../../custom-types/Category";

interface AddEditTransactionSliceState {

}

const initialState: AddEditTransactionSliceState = {

}

const addEditTransactionSlice = createSlice({
  name: "addEditTransaction",
  initialState: initialState,
  reducers: {

  }
})

export const AddEditTransactionReducer = addEditTransactionSlice.reducer;
export const AddEditTransactionSlice = addEditTransactionSlice.actions;


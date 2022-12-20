import {createSlice} from "@reduxjs/toolkit";

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


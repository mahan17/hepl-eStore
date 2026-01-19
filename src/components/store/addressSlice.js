import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddress(state, action) {
      return action.payload;
    },
    clearAddress() {
      return initialState;
    },
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice.reducer;

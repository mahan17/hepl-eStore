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
    updateAddress(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },

    loadAddress(state, action) {
      return action.payload;
    },

    clearAddress() {
      return initialState;
    },
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice.reducer;

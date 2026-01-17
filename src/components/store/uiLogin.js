import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  isLoggedIn: false,

  // UI states
  showPassword: false,
  showConfirmPassword: false,

  // Validation errors
  errors: {
    username: '',
    password: '',
    confirmPassword: '',
  },
};

const uiSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // ✅ Login validation
    validateForm(state, action) {
      const { username, password } = action.payload;

      state.errors.username = '';
      state.errors.password = '';

      if (!username) {
        state.errors.username = 'Username is required';
      } else if (!username.includes('@') || !username.includes('.com')) {
        state.errors.username = 'Username must contain @ and .com';
      }

      if (!password) {
        state.errors.password = 'Password is required';
      } else if (password.length < 6) {
        state.errors.password = 'Password must be at least 6 characters';
      }

      if (!state.errors.username && !state.errors.password) {
        state.isLoggedIn = true;
        state.username = username;
        state.password = password;
      }
    },

    // ✅ Logout
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      state.password = '';
      state.errors = {
        username: '',
        password: '',
        confirmPassword: '',
      };
    },

    // 👁 Password visibility
    togglePassword(state) {
      state.showPassword = !state.showPassword;
    },

    toggleConfirmPassword(state) {
      state.showConfirmPassword = !state.showConfirmPassword;
    },

    // ✅ Generic error setter (useful for Register)
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const loginActions = uiSlice.actions;
export default uiSlice.reducer;

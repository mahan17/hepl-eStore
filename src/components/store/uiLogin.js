import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
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
    /* 🔹 VALIDATION ONLY */
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
    },

    /* ✅ LOGIN SUCCESS (CALLED AFTER BACKEND LOGIN) */
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },

    /* ✅ LOGOUT */
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      state.errors = {
        username: '',
        password: '',
        confirmPassword: '',
      };
    },

    // 👁 UI toggles
    togglePassword(state) {
      state.showPassword = !state.showPassword;
    },

    toggleConfirmPassword(state) {
      state.showConfirmPassword = !state.showConfirmPassword;
    },

    setErrors(state, action) {
      state.errors = action.payload;
    },
    
    restoreLogin(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    }

  },
});

export const loginActions = uiSlice.actions;
export default uiSlice.reducer;

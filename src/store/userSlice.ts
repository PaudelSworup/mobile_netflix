import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userState {
  isAuthenticated: Boolean;
  token: string | null;
  userInfo: {
    _id: string;
    username: string;
    email: string;
  } | null;
}

const initialState: userState = {
  isAuthenticated: false,
  token: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{token: string; userInfo: userState['userInfo']}>,
    ) => {
      state.isAuthenticated = true;
      (state.token = action.payload.token),
        (state.userInfo = action.payload.userInfo);
    },

    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const {loginSuccess, logout} = userSlice.actions;
export default userSlice.reducer;

// src/redux/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  userName: string;
  profileImage: string | {uri: string};
  token: string;
}

const userInfo: AuthState = {
  userName: '',
  profileImage: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: userInfo,
  reducers: {
    setProfileImage: (state, action: PayloadAction<{image: string}>) => {
      return {...state, profileImage: action.payload.image};
    },
    setUserName: (state, action: PayloadAction<{name: string}>) => {
      return {...state, userName: action.payload.name};
    },
    setToken: (state, action: PayloadAction<{token: string}>) => {
      return {...state, token: action.payload.token};
    },
  },
});

export const {setToken, setUserName, setProfileImage} = authSlice.actions;
export const reducer = authSlice.actions;
export default authSlice.reducer;

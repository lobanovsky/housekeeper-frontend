/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { IUserData } from 'utils/types';

export const EMPTY_USER: IUserData = {
  id: 0,
  createDate: '',
  name: '',
  userId: -1,
  userName: '',
  access_token: '',
  roles: [],
  isAdmin: false,
  workspaceId: 0,
  workspaceName: '',
  isSuperAdmin: false
};

export interface AuthStoreState {
  workspaceId: number | null,
  workspaceName: string,
  user: IUserData,
  isCheckingToken: boolean,
  isLoadingUser: boolean,
  isLoggingIn: boolean,
  isUserLoggedIn: boolean,
}

const authSlice = createSlice<AuthStoreState, SliceCaseReducers<AuthStoreState>>({
  name: 'auth',
  initialState: {
    user: EMPTY_USER,
    workspaceId: null,
    workspaceName: '',
    isCheckingToken: true,
    isLoadingUser: false,
    isLoggingIn: false,
    isUserLoggedIn: false
  },
  reducers: {
    loginStarted: (state: AuthStoreState) => {
      state.isLoggingIn = true;
      state.isCheckingToken = true;
    },
    loginSuccess: (state: AuthStoreState, { payload }: PayloadAction<IUserData>) => {
      state.isLoggingIn = false;
      state.isUserLoggedIn = true;
      state.isCheckingToken = false;
      state.user = payload;
      state.workspaceId = payload.workspaceId || 0;
      state.workspaceName = payload.workspaceName || '';
    },
    loginError: (state: AuthStoreState, { payload }: PayloadAction<any>) => {
      state.isLoggingIn = false;
      state.isUserLoggedIn = false;
      state.isCheckingToken = false;
    },
    logout: (state: AuthStoreState) => {
      state.isUserLoggedIn = false;
      state.isCheckingToken = false;
      state.user = EMPTY_USER;
      state.workspaceId = null;
    },
    workspaceChanged: (state: AuthStoreState, {
      payload: {
        id,
        name
      }
    }: PayloadAction<{ id: number, name: string }>) => {
      state.user.workspaceId = id;
      state.user.workspaceName = name;
    }
  }
});

export const {
  loginStarted,
  loginSuccess,
  loginError,
  logout,
  workspaceChanged
} = authSlice.actions;

// @ts-ignore
export default authSlice.reducer;

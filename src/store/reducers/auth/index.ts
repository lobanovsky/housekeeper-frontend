/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from 'utils/types';
import { AvailableWorkspaceResponse } from '../../../backend/services/backend';

export const EMPTY_USER: IUserData = {
  id: 0,
  name: '',
  userId: -1,
  userName: '',
  access_token: '',
  roles: [],
  isAdmin: false,
  workspaceId: 0,
  workspaces: [],
  workspaceColor: '',
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

const authSlice = createSlice({
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
    loginError: (state: AuthStoreState) => {
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
        name,
        color
      }
    }: PayloadAction<AvailableWorkspaceResponse>) => {
      state.user.workspaceId = id;
      state.user.workspaceName = name;
      state.user.workspaceColor = color || '';
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

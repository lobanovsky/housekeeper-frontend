import { StoreState } from '../../index';

export const getWorkspaceId = (state: StoreState) => state.auth.user?.workspaceId || 0;

export const getUser = (state: StoreState) => state.auth.user;

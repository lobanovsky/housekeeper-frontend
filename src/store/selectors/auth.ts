import { StoreState } from '../index';

export const getWorkspaceId = (state: StoreState) => state.auth.user?.workspaceId || 0;

export const getIsAdmin = ({ auth }: StoreState) => auth.user.isAdmin || auth.user.isSuperAdmin;
export const getUser = (state: StoreState) => state.auth.user;

import { StoreState } from '../../index';

export const getWorkspaceId = (state: StoreState) => state.auth.user?.workspaceId || 0;

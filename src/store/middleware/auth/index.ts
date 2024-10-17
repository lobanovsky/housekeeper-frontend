import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginError } from '../../reducers/auth';

export const authMiddleware = createListenerMiddleware();
//
// authMiddleware.startListening({
//   matcher: isAnyOf(loginSuccess),
//   effect: async (action: any) => {
//     const { token } = action.payload;
//     if (action.payload.workspaces?.length) {
//       axios.defaults.headers.Authorization = `Bearer ${token}`;
//       // axios.interceptors.response.use((response) => response, axiosNotAuthorizedInterceptor);
//     } else {
//       redirect('/no-access');
//     }
//   }
// });

// authMiddleware.startListening({
//   matcher: isAnyOf(workspaceChanged),
//   effect: async (action: any, listenerApi: any) => {
//     const { id: newWorkspaceId } = action.payload;
//     console.log(`%c Load all data for workspace [${newWorkspaceId}]`, 'color: blue; background: lightgreen');
//     // loadWorkspaceData(listenerApi);
//   }
// });

authMiddleware.startListening({
  matcher: isAnyOf(loginError),
  effect: async (action: any, listenerApi: any) => {
    delete axios.defaults.headers.Authorization;
  }

});

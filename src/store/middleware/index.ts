import { authMiddleware } from './auth';

export const storeMiddleware = (getDefaultMiddleware: any) => getDefaultMiddleware({
  serializableCheck: false
})
  .prepend(
    authMiddleware.middleware
  );

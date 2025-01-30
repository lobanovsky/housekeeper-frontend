import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoading } from './use-loading';
import { showError } from '../utils/notifications';
import { ActionCallbackWithData, ServerError } from '../utils/types';
import { IRequestOptions } from '../backend/services/backend';
import { StoreState } from '../store';

export interface RemoteDataParams<T, OutputT> {
  errorMsg?: string,
  dataConverter?: (data: T) => OutputT,
  defaultShowLoading?: boolean
}

function useRemoteData<T, OutputT = T>(loader: (options?: IRequestOptions) => Promise<T>, {
  errorMsg = 'Не удалось загрузить данные',
  defaultShowLoading = false,
  dataConverter = undefined
}: RemoteDataParams<T, OutputT> = {
  errorMsg: 'Не удалось загрузить данные',
  defaultShowLoading: false,
  dataConverter: undefined
}): [OutputT | null, boolean, (onSuccess?: ActionCallbackWithData<OutputT>) => void] {
  const {
    isUserLoggedIn,
    isCheckingToken
  } = useSelector((state: StoreState) => state.auth);

  const [loading, showLoading, hideLoading] = useLoading(defaultShowLoading);
  const [data, setData] = useState<OutputT | null>(null);

  const loadData = useCallback((onSuccess?: ActionCallbackWithData<OutputT>) => {
    if (!isUserLoggedIn || isCheckingToken) {
      return;
    }

    showLoading();
    loader()
      .then((responseData: T) => {
        hideLoading();
        const result = dataConverter ? dataConverter(responseData) : responseData;

        setData(result as OutputT);
        if (onSuccess) {
          onSuccess(true, result as OutputT);
        }
      })
      .catch((e: ServerError) => {
        showError(errorMsg, e);
        hideLoading();
      });
  }, [loader, isUserLoggedIn, isCheckingToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return [data, loading, loadData];
}

export default useRemoteData;

import { useCallback, useEffect, useState } from "react";
import { useLoading } from "./use-loading";
import { showError } from "../utils/notifications";
import { ServerError } from "../utils/types";
import { IRequestOptions } from "../backend/services/backend";

export interface RemoteDataParams<T, OutputT> {
  errorMsg?: string,
  dataConverter?: (data: T) => OutputT,
  loadOnInit?: boolean
}

function useRemoteData<T, OutputT = T>(loader: (options?: IRequestOptions) => Promise<T>, {
  errorMsg = "Не удалось загрузить данные",
  dataConverter = undefined,
  loadOnInit = true
}: RemoteDataParams<T, OutputT> = {
  errorMsg: "Не удалось загрузить данные",
  dataConverter: undefined,
  loadOnInit: true
}): [OutputT | null, boolean, () => void] {
  const [loading, showLoading, hideLoading] = useLoading();
  const [data, setData] = useState<OutputT | null>(null);

  const loadData = useCallback(() => {
    showLoading();
    loader()
      .then((responseData: T) => {
        hideLoading();

        const result = dataConverter ? dataConverter(responseData) : responseData;

        setData(result as OutputT);
      })
      .catch((e: ServerError) => {
        showError(errorMsg, e);
        hideLoading();
      });
  }, [loader]);

  useEffect(() => {
    loadData();
  }, [loader]);

  return [data, loading, loadData];
}

export default useRemoteData;

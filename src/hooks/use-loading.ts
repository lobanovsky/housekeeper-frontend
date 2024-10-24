import { useCallback, useState } from 'react';
import Loading from 'components/loading';

function useLoading(defaultValue = false): [boolean, () => void, () => void] {
  const [isLoading, setIsLoading] = useState(defaultValue);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return [isLoading, showLoading, hideLoading];
}

export { Loading, useLoading };

import { useCallback, useState } from 'react';

export function useLoading(defaultValue = false): [boolean, () => void, () => void] {
  const [isLoading, setIsLoading] = useState(defaultValue);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return [isLoading, showLoading, hideLoading];
}

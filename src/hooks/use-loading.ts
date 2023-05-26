import { useCallback, useState } from 'react';

export function useLoading(): [boolean, () => void, () => void] {
	const [isLoading, setIsLoading] = useState(false);


	const showLoading = useCallback(() => {
		setIsLoading(true);
	}, []);

	const hideLoading = useCallback(() => {
		setIsLoading(false);
	}, []);

	return [isLoading, showLoading, hideLoading];
}

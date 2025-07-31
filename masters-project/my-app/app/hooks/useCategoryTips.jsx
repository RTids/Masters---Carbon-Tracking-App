//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Hooks/Functions
import getTipsByCategory from '@/lib/carbon/getTipsByCategory';
import getYesterdayHighestCategory from '@/lib/carbon/getYesterdayHighestCategory';
import getNextTip from '@/lib/carbon/getNextTip';

export const useCategoryTips = () => {
	const [tip, setTip] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCategoryTips = async () => {
			const yesterdayHighestCategory = await getYesterdayHighestCategory();
			const data = await getTipsByCategory(yesterdayHighestCategory);
			if (data.length > 0) {
				setTip(data);
			} else {
				const nextTip = await getNextTip();
				setTip(nextTip);
			}

			setIsLoading(false);
		};
		fetchCategoryTips();
	}, []);
	return {
		tip,
		isLoading,
	};
};

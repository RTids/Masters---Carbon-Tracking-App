//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Hooks/Functions
import getTipsByCategory from '@/lib/carbon/getTipsByCategory';
import getYesterdayHighestCategory from '@/lib/carbon/getYesterdayHighestCategory';
import getNextTip from '@/lib/carbon/getNextTip';
import recordTipView from '@/lib/carbon/recordTipView';

export const useCategoryTips = () => {
	const [tip, setTip] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCategoryTips = async () => {
			const yesterdayHighestCategory = await getYesterdayHighestCategory();
			const data = await getTipsByCategory(yesterdayHighestCategory);

			if (!data) {
				const nextTip = await getNextTip();
				setTip(nextTip);
			} else {
				setTip(data);
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

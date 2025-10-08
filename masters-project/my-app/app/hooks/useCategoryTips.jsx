//External Libraries/Modules
import { useEffect, useState } from 'react';

//Custom Hooks/Functions
import getYesterdayHighestCategory from '@/lib/carbon/getYesterdayHighestCategory';
import getBestNextTip from '@/lib/carbon/getBestNextTip';

export const useCategoryTips = () => {
	const [tip, setTip] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCategoryTip = async () => {
			const yesterdayHighestCategory = await getYesterdayHighestCategory();
			const tipData = await getBestNextTip(yesterdayHighestCategory);
			setTip(tipData);
			setIsLoading(false);
		};

		fetchCategoryTip();
	}, []);

	return {
		tip,
		isLoading,
	};
};

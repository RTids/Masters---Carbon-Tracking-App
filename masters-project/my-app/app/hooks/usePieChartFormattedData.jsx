//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Functions / Hooks
import getPreviousSixDays from '@/lib/carbon/totals/getPreviousSixDays';
import getDailyTotal from '@/lib/carbon/totals/getDailyTotal';
import { formatDate } from '@/utils/formatting';
import getPreviousSixWeeks from '@/lib/carbon/totals/getPreviousSixWeeks';

export const usePieChartFormattedData = (timeframe) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			let rawData = [];
			if (timeframe === 'week') {
				const weeklyData = await getPreviousSixDays();
				const todayData = await getDailyTotal();
				rawData = [...weeklyData, todayData];
			} else if (timeframe === 'month') {
				const monthlyData = await getPreviousSixWeeks();
				rawData = [...monthlyData];
			}

			let categoryTotals = [
				{ name: 'food-drink', value: 0 },
				{ name: 'travel', value: 0 },
				{ name: 'energy-home', value: 0 },
				{ name: 'lifestyle', value: 0 },
			];

			for (const item of rawData) {
				const breakdown = item.category_breakdown || {};
				for (const key in breakdown) {
					const index = categoryTotals.findIndex((entry) => entry.name === key);
					if (index !== -1) {
						categoryTotals[index].value += breakdown[key];
					}
				}
			}

			const formatted = categoryTotals;

			console.log(formatted);
			setData(formatted);
			setLoading(false);
		};
		fetchData();
	}, [timeframe]);

	return { data, loading };
};

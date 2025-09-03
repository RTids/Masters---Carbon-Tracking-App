//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Functions / Hooks
import getPreviousSixDays from '@/lib/carbon/totals/getPreviousSixDays';
import getDailyTotal from '@/lib/carbon/totals/getDailyTotal';
import getPreviousSixWeeks from '@/lib/carbon/totals/getPreviousSixWeeks';
import { formatCategory } from '@/utils/formatting';
import getPreviousTwelveMonths from '@/lib/carbon/totals/getPreviousTwelveMonths';

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
			} else if (timeframe === 'year') {
				const yearlyData = await getPreviousTwelveMonths();
				rawData = [...yearlyData];
			}

			let categoryTotals = [
				{ name: 'Food/Drink', value: 0 },
				{ name: 'Travel', value: 0 },
				{ name: 'Energy/Home', value: 0 },
				{ name: 'Lifestyle', value: 0 },
			];

			for (const item of rawData) {
				const breakdown = item.category_breakdown || {};
				for (const key in breakdown) {
					const index = categoryTotals.findIndex(
						(entry) => entry.name === formatCategory(key)
					);
					if (index !== -1) {
						categoryTotals[index].value += breakdown[key];
					}
				}
			}

			const formatted = categoryTotals.map((entry) => ({
				name: entry.name,
				value: Math.round(entry.value * 100) / 100, // Will return number
			}));

			setData(formatted);
			setLoading(false);
		};
		fetchData();
	}, [timeframe]);

	return { data, loading };
};

//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Functions / Hooks
import getPreviousSixDays from '@/lib/carbon/totals/getPreviousSixDays';
import getDailyTotal from '@/lib/carbon/totals/getDailyTotal';
import { formatDate } from '@/utils/formatting';
import getPreviousSixWeeks from '@/lib/carbon/totals/getPreviousSixWeeks';
import getPreviousTwelveMonths from '@/lib/carbon/totals/getPreviousTwelveMonths';

export const useChartFormattedData = (timeframe) => {
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

			const formatted = rawData.map((item) => {
				let dateKey;
				if (timeframe === 'week') {
					dateKey = item.date;
				} else if (timeframe === 'month') {
					dateKey = item.week_start;
				} else if (timeframe === 'year') {
					dateKey = item.month_start;
				}

				return {
					...item,
					total: item.total.toFixed(2),
					date: formatDate(dateKey),
				};
			});

			setData(formatted);
			setLoading(false);
		};
		fetchData();
	}, [timeframe]);

	return { data, loading };
};

//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Functions / Hooks
import getPreviousSixDays from '@/lib/carbon/getPreviousSixDays';
import getDailyTotal from '@/lib/carbon/getDailyTotal';
import { formatDate } from '@/utils/formatting';

export const useChartFormattedData = (timeframe) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			let rawData = [];
			if (timeframe === 'weekly') {
				const weeklyData = await getPreviousSixDays();
				const todayData = await getDailyTotal();
				rawData = [...weeklyData, todayData];
			}

			const formatted = rawData.map((item) => ({
				...item,
				total: item.total.toFixed(2),
				date: formatDate(item.date),
			}));

			setData(formatted);
			setLoading(false);
		};
		fetchData();
	}, [timeframe]);

	return { data, loading };
};

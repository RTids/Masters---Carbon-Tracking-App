'use client';

//External Libaries / Modules
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from 'next-themes';
//Internal Components
import Loading from '../ui/loading';
//Custom Hooks / Functions
import { useChartFormattedData } from '@/app/hooks/useChartFormattedData';

export default function DrawLineChart({ timeframe }) {
	const { data, loading } = useChartFormattedData(timeframe);

	const { theme } = useTheme();
	const isDark = theme === 'dark';

	const axisColour = isDark ? '#ccc' : '#333';
	const lineColour = isDark ? '#4fd1c5' : '#3182ce';

	if (loading) return <Loading />;

	return (
		<LineChart width={400} height={150} data={data}>
			<Line type='monotone' dataKey='total' stroke={lineColour} />
			<XAxis dataKey='date' stroke={axisColour} />
			<YAxis dataKey='total' />
			<Tooltip
				contentStyle={{
					backgroundColor: isDark ? '#1a202c' : '#fff',
					borderColor: isDark ? '#4fd1c5' : '#3182ce',
					color: isDark ? '#f0f0f0' : '#222',
				}}
			/>
		</LineChart>
	);
}

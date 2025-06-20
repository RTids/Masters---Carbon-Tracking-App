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

	const { theme, resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	const axisColour = isDark ? '#ccc' : '#333';
	const lineColour = isDark ? '#4fd1c5' : '#3182ce';
	const toolTipColour = isDark ? '#1a202c' : '#ffffff';
	const textColour = isDark ? '#ffffff' : '#1a202c';

	if (loading) return <Loading />;

	console.log(data);

	if (data.length < 1)
		return <div className='pt-5'>No data for this timeframe.</div>;

	return (
		<LineChart width={400} height={150} data={data}>
			<Line type='monotone' dataKey='total' stroke={lineColour} />
			<XAxis dataKey='date' stroke={axisColour} />
			<YAxis dataKey='total' />
			<Tooltip
				contentStyle={{
					backgroundColor: toolTipColour,
					borderColor: isDark ? '#4fd1c5' : '#3182ce',
					color: textColour,
				}}
			/>
		</LineChart>
	);
}

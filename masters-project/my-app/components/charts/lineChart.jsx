'use client';

//External Libaries / Modules
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
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

	const yDomain =
		timeframe === 'week'
			? [0, 'auto']
			: timeframe === 'month'
			? [0, 60]
			: [0, 250];

	if (loading) return <Loading />;

	if (data.length < 1)
		return <div className='pt-5'>No data for this timeframe.</div>;

	return (
		<div className='flex justify-center items-center w-full max-w-xl mx-auto'>
			<ResponsiveContainer width='100%' height={300}>
				<LineChart width={300} height={300} data={data}>
					<Line type='monotone' dataKey='total' stroke={lineColour} />
					<XAxis dataKey='date' stroke={axisColour} />
					<YAxis dataKey='total' type='number' domain={yDomain} tickCount={5} />
					<Tooltip
						contentStyle={{
							backgroundColor: toolTipColour,
							borderColor: isDark ? '#4fd1c5' : '#3182ce',
							color: textColour,
						}}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

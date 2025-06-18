'use client';

//External Libaries / Modules
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
//Internal Components
import Loading from '../ui/loading';
//Custom Hooks / Functions
import { useChartFormattedData } from '@/app/hooks/useChartFormattedData';

export default function DrawLineChart({ timeframe }) {
	const { data, loading } = useChartFormattedData(timeframe);

	if (loading) return <Loading />;

	return (
		<LineChart width={300} height={150} data={data}>
			<Line type='monotone' dataKey='total' stroke='#8884d8' />
			<XAxis dataKey='date' />
			<YAxis dataKey='total' />
			<Tooltip />
		</LineChart>
	);
}

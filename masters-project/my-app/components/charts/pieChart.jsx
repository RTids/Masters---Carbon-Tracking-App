'use client';

//External Libaries / Modules
import { Pie, PieChart, Cell, Legend } from 'recharts';
import { useTheme } from 'next-themes';
//Internal Components
import Loading from '../ui/loading';
//Custom Hooks / Functions
import { usePieChartFormattedData } from '@/app/hooks/usePieChartFormattedData';

export default function DrawPieChart({ timeframe }) {
	const { data, loading } = usePieChartFormattedData(timeframe);

	if (loading) return <Loading />;

	if (data.length < 1)
		return <div className='pt-5'>No data for this timeframe.</div>;

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		if (percent === 0) return null;npm
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill='white'
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline='central'
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<>
			<h2>Pie</h2>
			<PieChart width={400} height={200}>
				<Pie
					data={data}
					nameKey='name'
					dataKey='value'
					label={renderCustomizedLabel}
					labelLine={false}
					outerRadius={80}
					fill='#8884d8'
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend />
			</PieChart>
		</>
	);
}

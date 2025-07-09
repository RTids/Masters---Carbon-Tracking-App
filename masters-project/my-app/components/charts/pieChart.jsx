'use client';

//External Libaries / Modules
import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from 'recharts';
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
		if (percent === 0) return null;
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
		<div className='flex justify-center items-center w-full max-w-xl mx-auto'>
			<ResponsiveContainer width='100%' height={300}>
				<PieChart width={300} height={300}>
					<Pie
						data={data}
						nameKey='name'
						dataKey='value'
						label
						labelLine={true}
						fill='#8884d8'
						outerRadius={60}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Legend
						formatter={(value) => (
							<span style={{ fontSize: '12px' }}>{value}</span>
						)}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

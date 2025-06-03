'use client';

import { useState, useEffect } from 'react';
import getDailyTotal from '@/lib/carbon/getDailyTotal';
import getYesterdayTotal from '@/lib/carbon/getYesterdayTotal';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

export default function DailyEmissions({ isModalOpen }) {
	const [dailyTotal, setDailyTotal] = useState(0);
	const [yesterdaysTotal, setYesterdaysTotal] = useState(0);
	const [difference, setDifference] = useState(0);

	const getTotal = async () => {
		const todayTotal = await getDailyTotal();
		setDailyTotal(todayTotal);

		const yesterdayTotal = await getYesterdayTotal();
		setYesterdaysTotal(yesterdayTotal);

		const result = todayTotal - yesterdayTotal;
		setDifference(result.toFixed(2));
	};

	useEffect(() => {
		getTotal();
	}, [isModalOpen]);

	return (
		<div className='text-center pt-5 pb-5'>
			<h4>TODAY'S CURRENT FOOTPRINT</h4>
			<p className='text-lg font-thin'>
				<span className='text-4xl font-bold'>{dailyTotal.toFixed(2)}</span>{' '}
				kgCO₂e
			</p>
			<p className='font-thin mt-3'>
				Yesterday's Total: {yesterdaysTotal.toFixed(2)} kgCO₂e
			</p>
		</div>
	);
}

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
		<div className='text-center pt-3 border-b-7 pb-3 w-2/3'>
			<h2 className='text-base font-bold sm:text-2xl'>
				TODAY'S CURRENT FOOTPRINT
			</h2>
			<p className='text-lg sm:text-lg font-bold'>
				{dailyTotal.toFixed(2)}
				<span className='text-sm sm:text-lg font-thin'> kgCO₂e</span>
			</p>
			<p className='font-thin mt-3 sm:font-base font-sm'>
				Yesterday's Total: {yesterdaysTotal.toFixed(2)} kgCO₂e
			</p>
		</div>
	);
}

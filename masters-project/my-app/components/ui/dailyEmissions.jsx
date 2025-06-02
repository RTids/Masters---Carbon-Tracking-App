'use client';

import { useState, useEffect } from 'react';
import getDailyTotal from '@/lib/carbon/getDailyTotal';
import getYesterdayTotal from '@/lib/carbon/getYesterdayTotal';

export default function DailyEmissions({ isModalOpen }) {
	const [dailyTotal, setDailyTotal] = useState(0);
	const [yesterdaysTotal, setYesterdaysTotal] = useState(0);
	const [difference, setDifference] = useState(0);

	const getTotal = async () => {
		const todayTotal = await getDailyTotal();
		setDailyTotal(todayTotal);

		const yesterdayTotal = await getYesterdayTotal();
		setYesterdaysTotal(yesterdayTotal);

		const result = todayTotal % yesterdayTotal;
		result === NaN ? setDifference(result.toFixed(2)) : setDifference(0);
	};

	useEffect(() => {
		getTotal();
	}, [isModalOpen]);

	return (
		<div>
			<h1>{dailyTotal.toFixed(2)} kg CO₂e</h1>
			<h3>{difference}</h3>
		</div>
	);
}

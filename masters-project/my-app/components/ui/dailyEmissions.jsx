'use client';

//External Libraries / Modules
import { useState, useEffect } from 'react';

//Internal Components
import KGCO2E from '@/lib/ui/kgCO2e';

//External Hooks / Functions
import getDailyTotal from '@/lib/carbon/totals/getDailyTotal';
import getYesterdayTotal from '@/lib/carbon/totals/getYesterdayTotal';
import getPreviousWeekTotal from '@/lib/carbon/totals/getPreviousWeekTotal';
import getCurrentWeekTotal from '@/lib/carbon/totals/getCurrentWeekTotal';

export default function DailyEmissions({ isModalOpen }) {
	const [dailyTotal, setDailyTotal] = useState(0);
	const [yesterdaysTotal, setYesterdaysTotal] = useState(0);
	const [previousWeekTotal, setPreviousWeekTotal] = useState(0);
	const [currentWeekTotal, setCurrentWeekTotal] = useState(0);

	const getTotal = async () => {
		const todayTotal = await getDailyTotal();
		setDailyTotal(todayTotal.total);

		const yesterdayTotal = await getYesterdayTotal();
		setYesterdaysTotal(yesterdayTotal);

		const lastWeekTotal = await getPreviousWeekTotal();
		setPreviousWeekTotal(lastWeekTotal);

		const thisWeekTotal = await getCurrentWeekTotal();
		setCurrentWeekTotal(thisWeekTotal);
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
				<span className='text-sm sm:text-lg font-thin'>
					{' '}
					<KGCO2E />
				</span>
			</p>
			<p className='font-thin mt-1 sm:font-base text-sm'>
				Yesterday's Total: {yesterdaysTotal.toFixed(2)} <KGCO2E />
			</p>
			<p className='font-thin mt-1 sm:font-base text-xs'>
				Current Week's Total: {currentWeekTotal.toFixed(2)} <KGCO2E />
			</p>
			<p className='font-thin mt-1 sm:font-base text-xs'>
				Previous Week's Total: {previousWeekTotal.toFixed(2)} <KGCO2E />
			</p>
		</div>
	);
}

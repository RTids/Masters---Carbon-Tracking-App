'use client';

//External Libraries / Modules
import { Card, CardContent, CardTitle } from './shadcn/card';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

//Internal Components
import KGCO2E from '@/lib/ui/kgCO2e';

//Custom Hooks / Functions
import {
	getYesterdayDifference,
	getWeekDifference,
} from '@/lib/carbon/totals/getDifference';

export default function EmissionsDifference() {
	const [yesterdayDifference, setYesterdayDifference] = useState('Loading...');
	const [yesterdayDifferenceSign, setYesterdayDifferenceSign] = useState(0);
	const [weekDifference, setWeekDifference] = useState('Loading...');
	const [weekDifferenceSign, setWeekDifferenceSign] = useState(0);

	const fetchDifferences = async () => {
		const yesterdayResult = await getYesterdayDifference();
		setYesterdayDifference(yesterdayResult);
		setYesterdayDifferenceSign(Math.sign(yesterdayResult));
		const weekResult = await getWeekDifference();
		setWeekDifference(weekResult);
		setWeekDifferenceSign(Math.sign(weekResult));
	};

	useEffect(() => {
		fetchDifferences();
	}, []);

	return (
		<div className='flex flex-col justify-center items-center gap-3 w-2/3 pb-3 max-w-9/10'>
			<div className='flex flex-row justify-center items-center gap-3 w-full'>
				<Card className='p-2 sm:p-5 sm:h-[60px] w-full sm:w-[300px] flex flex-row items-center justify-center w-full relative text-center'>
					<CardTitle className='text-xs sm:text-sm mb-2 absolute top-1 w-full'>
						Yesterday
					</CardTitle>
					<CardContent className='flex flex-1 flex-row items-center justify-center gap-4 text-center h-full w-full pt-2 sm:pt-5 px-3 sm:px-6'>
						{yesterdayDifferenceSign === 1 ? (
							<IconTrendingUp color='red' size={32} />
						) : yesterdayDifferenceSign === -1 ? (
							<IconTrendingDown color='green' size={32} />
						) : (
							''
						)}
						<div className='flex flex-row gap-1 text-xs sm:text-base font-semibold w-1/2 items-center justify-center'>
							<span>{yesterdayDifference}</span>
							<KGCO2E />
						</div>
					</CardContent>
				</Card>
				<Card className='p-2 sm:p-5 sm:h-[60px] w-full sm:w-[300px] flex flex-col items-center justify-center w-full relative text-center'>
					<CardTitle className='text-xs sm:text-sm mb-2 absolute top-1 w-full'>
						Previous Week
					</CardTitle>
					<CardContent className='flex flex-1 flex-row items-center justify-center gap-4 text-center h-full w-full pt-2 sm:pt-5 px-3 sm:px-6'>
						{weekDifferenceSign === 1 ? (
							<IconTrendingUp color='red' size={32} />
						) : weekDifferenceSign === -1 ? (
							<IconTrendingDown color='green' size={32} />
						) : (
							''
						)}
						<div className='flex flex-row gap-1 text-xs sm:text-base font-semibold w-1/2 items-center justify-center'>
							<span>{weekDifference}</span>
							<KGCO2E />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

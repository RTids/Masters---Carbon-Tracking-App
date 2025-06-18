'use client';

import { Card, CardContent, CardTitle } from './card';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { getYesterdayDifference } from '@/lib/carbon/getDifference';

export default function EmissionsDifference() {
	const [yesterdayDifference, setYesterdayDifference] = useState('Loading...');
	const [yesterdayDifferenceSign, setYesterdayDifferenceSign] = useState(0);

	const fetchDifferences = async () => {
		const result = await getYesterdayDifference();
		setYesterdayDifference(result);
		setYesterdayDifferenceSign(Math.sign(result));
	};

	useEffect(() => {
		fetchDifferences();
	}, []);

	return (
		<div className='flex flex-col justify-center items-center gap-3 w-2/3 pb-3'>
			<div className='flex flex-row justify-center items-center gap-5'>
				<Card className='p-5 sm:h-[60px] sm:w-[300px] flex flex-col items-center justify-center w-2/3 relative'>
					<CardTitle className='text-sm mb-2 absolute top-1'>
						Difference from Yesterday
					</CardTitle>
					<CardContent className='flex flex-1 flex-row items-center justify-center gap-2 text-center h-full w-full pt-5'>
						{yesterdayDifferenceSign === 1 ? (
							<IconTrendingUp color='red' size={32} />
						) : yesterdayDifferenceSign === -1 ? (
							<IconTrendingDown color='green' size={32} />
						) : (
							''
						)}
						<p className='text-md font-semibold'>
							{yesterdayDifference}{' '}
							<span className='text-sm font-thin'> kgCO₂e</span>
						</p>
					</CardContent>
				</Card>
				<Card className='p-5 sm:h-[60px] sm:w-[300px] flex flex-col items-center justify-center w-2/3 relative'>
					<CardTitle className='text-sm mb-2 absolute top-1'>
						Previous Week
					</CardTitle>
					<CardContent className='flex flex-1 flex-row items-center justify-center gap-2 text-center h-full w-full pt-5'>
						Coming soon...
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

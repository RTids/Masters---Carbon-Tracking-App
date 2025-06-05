'use client';

import { useEffect, useState } from 'react';
import getNextTip from '@/lib/carbon/getNextTip';

export default function RandomTip() {
	const [tip, setTip] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchTip() {
			try {
				const nextTip = await getNextTip();
				setTip(nextTip);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchTip();
	}, []);

	if (loading)
		return <p className='w-2/3 max-h-[140px] text-center'>Loading tip...</p>;
	if (error)
		return <p className='w-2/3 max-h-[140px] text-center'>Error: {error}</p>;

	if (!tip)
		return (
			<p className='w-2/3 max-h-[140px] text-center'>No tips available.</p>
		);

	return (
		<div className='w-9/10 sm:w-2/3 max-h-[140px] text-center pt-3 pb-3'>
			<h2 className='text-base font-bold sm:text-2xl'>DAILY EMISSIONS TIP</h2>
			<h3 className='text-sm sm:text-base'>{tip.title}</h3>
			<p className='font-light text-sm sm:text-base'>{tip.description}</p>
			<p className='font-light text-xs sm:text-base'>
				Estimated Yearly Savings: {tip.estimated_savings}{' '}
				<span className='font-thin text-xs sm:text-sm italic'>kgCO₂e</span>
			</p>
			<p className='font-thin text-xs sm:text-sm italic'>
				Category: {tip.category}
			</p>
		</div>
	);
}

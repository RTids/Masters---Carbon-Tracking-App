'use client';

//Import Custom Hooks/Functions
import { useCategoryTips } from '@/app/hooks/useCategoryTips';
import { formatCategory, capitalize } from '@/utils/formatting';

export default function RandomTip() {
	const { tip, loading } = useCategoryTips();

	if (loading)
		return <p className='w-2/3 max-h-[140px] text-center'>Loading tip...</p>;

	if (!tip)
		return (
			<p className='w-2/3 max-h-[140px] text-center'>No tips available.</p>
		);

	return (
		<div className='w-9/10 max-h-[140px] text-center pt-2 pb-3'>
			<h2 className='text-base font-bold sm:text-2xl'>DAILY EMISSIONS TIP</h2>
			<h3 className='text-sm sm:text-base'>{tip.tip_title}</h3>
			<p className='font-light text-sm'>{tip.tip_description}</p>
			<p className='font-light text-xs'>
				Estimated Yearly Savings: {tip.tip_estimated_savings}
				<span className='font-thin text-xs italic'> kgCO₂e</span>
			</p>
			<p className='font-thin text-xs italic'>
				Category: {formatCategory(tip.tip_category)}
			</p>
		</div>
	);
}

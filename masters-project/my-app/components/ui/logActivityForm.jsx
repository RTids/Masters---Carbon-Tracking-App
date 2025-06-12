'use client';

import { useState } from 'react';
import logActivity from '@/lib/carbon/logActivity';
import { Button } from './button';
import { formatUnits } from '@/utils/formatting';

export default function LogActivityForm({ activity, onSuccess, onError }) {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const result = await logActivity(amount, activity);

		setLoading(false);

		if (result?.error) {
			onError(result.error);
		} else {
			onSuccess();
		}
	};

	const calculatedEmissions = (activity.emissions_per_unit * amount).toFixed(2);

	return (
		<div className='text-center'>
			<h2 className='text-4xl font-bold pb-3 pt-5'>{activity.name}</h2>
			<h4 className='pb-3'>
				{calculatedEmissions} <span className='font-thin text-sm'>kgCO₂e</span>
			</h4>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col justify-center items-center text-center gap-5'
			>
				<div className='pb-3'>
					<input
						className='w-1/5 pr-2'
						id='amount'
						name='amount'
						type='number'
						min='0'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
					<label htmlFor='amount' className='text-sm font-thin'>
						{formatUnits(activity.unit)}
					</label>
				</div>

				<Button type='submit' disabled={loading} variant='outline'>
					{loading ? 'Logging...' : 'Log Activity'}
				</Button>
			</form>
		</div>
	);
}

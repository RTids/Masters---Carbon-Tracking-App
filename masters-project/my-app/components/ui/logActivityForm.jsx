'use client';

import { useState } from 'react';
import logActivity from '@/lib/carbon/logActivity';
import { Button } from './button';

export default function LogActivityForm({ activity, onSuccess, onError }) {
	const [amount, setAmount] = useState(0);
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

	return (
		<div className='border-2 border-solid border-red-200 text-center'>
			<h2 className='text-2xl text-bold'>{activity.name}</h2>
			<h4>{activity.emissions_per_unit}</h4>
			<form onSubmit={handleSubmit} className='flex flex-col'>
				<input
					id='amount'
					name='amount'
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
				<label htmlFor='amount'>{activity.unit}</label>
				<Button type='submit' disabled={loading}>
					{loading ? 'Logging...' : 'Log Activity'}
				</Button>
			</form>
		</div>
	);
}

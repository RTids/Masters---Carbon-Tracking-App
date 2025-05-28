import { useState } from 'react';
import logActivity from '@/lib/carbon/logActivity';

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
		<div>
			<h2>{activity.name}</h2>
			<h4>{activity.emissions_per_unit}</h4>
			<form onSubmit={handleSubmit}>
				<input
					id='amount'
					name='amount'
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<label htmlFor='amount'>{activity.unit}</label>
				<button type='submit' disabled={loading}>
					{loading ? 'Logging...' : 'Log Activity'}
				</button>
			</form>
		</div>
	);
}

'use client';

import { Button } from './button';
import getPinnedActivities from '@/lib/carbon/getPinnedActivities';
import { useState, useEffect } from 'react';
import pinActivity from '@/lib/carbon/pinActivity';

export default function PinActivityButton({ activity, onSuccess, onError }) {
	const [isPinned, setIsPinned] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getPinnedActivitiesList = async () => {
			setLoading(true);
			const list = await getPinnedActivities();
			if (list.some((item) => item.activity_id === activity.id)) {
				setIsPinned(true);
			} else {
				setIsPinned(false);
			}
			setLoading(false);
		};
		getPinnedActivitiesList();
	}, [activity.id]);

	const handlePin = async () => {
		setLoading(true);

		const result = await pinActivity(activity, isPinned);

		setLoading(false);

		if (result?.error) {
			onError(result.error);
		} else {
			onSuccess(result.message);
			setIsPinned((prev) => !prev);
		}
	};

	return (
		<Button
			variant='outline'
			onClick={handlePin}
			disabled={loading}
			className='absolute top-4 left-4'
		>
			{loading
				? 'Loading...'
				: isPinned
				? 'Remove from Quick Access'
				: 'Add to Quick Access'}
		</Button>
	);
}

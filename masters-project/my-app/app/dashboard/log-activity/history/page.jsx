'use client';

import NavBar from '@/components/ui/navBar';
import displayActivityHistory from '@/lib/carbon/displayActivityHistory';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

export default function ActivityHistory() {
	const [activityHistoryList, setActivityHistoryList] = useState(null);

	const loadHistoryList = async () => {
		const list = await displayActivityHistory();
		setActivityHistoryList(list);
	};

	useEffect(() => {
		const fetchActivityHistory = async () => {
			const supabase = createClient();
			const { data: sessionData, error: sessionError } =
				await supabase.auth.getUser();

			if (sessionError || !sessionData)
				throw new Error('User not authenticated.');
			try {
				loadHistoryList();
			} catch (err) {
				console.log(err);
			}
		};
		fetchActivityHistory();
	}, []);

	return (
		<div className='w-full'>
			<NavBar onDashboard={false} />
			<div className='flex flex-col justify-center items-center text-center max-h-1/2 overflow-y-auto pt-40'>
				{activityHistoryList ? (
					activityHistoryList.map((activity, index) => (
						<div
							key={index}
							className='p-2 border-b flex justify-center items-center w-2/3'
						>
							<div className='w-full sm:w-1/3'>
								<p className='font-bold'>{activity.activityName}</p>
								<p className='text-sm text-gray-600'>
									{activity.category} | {activity.date}
								</p>
								<p>
									{activity.amount} {activity.units}
									{activity.amount > 1 ? 's' : ''} → {activity.totalEmissions}{' '}
									kg CO₂e
								</p>
							</div>
							<Button variant='destructive' className='cursor-pointer'>
								Delete
							</Button>
						</div>
					))
				) : (
					<p>Loading activity history...</p>
				)}
			</div>
		</div>
	);
}

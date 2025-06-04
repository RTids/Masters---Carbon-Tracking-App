'use client';

import NavBar from '@/components/ui/navBar';
import displayActivityHistory from '@/lib/carbon/displayActivityHistory';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import deleteActivity from '@/lib/carbon/deleteActivity';

export default function ActivityHistory() {
	const [activityHistoryList, setActivityHistoryList] = useState(null);

	const loadHistoryList = async () => {
		const list = await displayActivityHistory();
		setActivityHistoryList(list);
		console.log(list);
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
			<h2 className='mt-25 text-center text-2xl'>Activity History</h2>
			<div className='flex flex-col justify-center items-center text-center max-h-1/2 overflow-y-auto pt-5 w-full'>
				{activityHistoryList ? (
					activityHistoryList.map((activity) => (
						<div
							key={activity.id}
							className='p-2 border-b flex justify-around items-center w-full pr-5 sm:justify-center'
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
							<Button
								variant='destructive'
								className='cursor-pointer sm:w-1/6'
								onClick={async () => {
									const result = await deleteActivity(activity.id);

									if (result?.error) {
										toast.error(`Failed to delete log: ${result.error}`);
									} else {
										toast.success('Activity Deleted');
										loadHistoryList();
									}
								}}
							>
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

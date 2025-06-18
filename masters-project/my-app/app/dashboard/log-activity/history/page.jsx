'use client';

//External Libraries / Modules
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/buttons/button';
import { toast } from 'sonner';

//Internal Components
import ProtectedRoute from '@/components/protectedRoute';
import NavBar from '@/components/ui/navBar';

//Custom Hooks / Functions
import displayActivityHistory from '@/lib/carbon/displayActivityHistory';
import deleteActivity from '@/lib/carbon/deleteActivity';
import { formatUnits, formatCategory } from '@/utils/formatting';

export default function ActivityHistory() {
	const [activityHistoryList, setActivityHistoryList] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const loadHistoryList = async () => {
		const list = await displayActivityHistory();
		setActivityHistoryList(list);
		setIsLoading(false);
	};

	useEffect(() => {
		const fetchActivityHistory = async () => {
			loadHistoryList();
		};
		fetchActivityHistory();
	}, []);

	return (
		<ProtectedRoute>
			<div className='w-full'>
				<NavBar onDashboard={false} />
				<h2 className='mt-25 text-center text-2xl'>Activity History</h2>
				<div className='flex flex-col justify-center items-center text-center max-h-1/2 overflow-y-auto pt-5 w-full'>
					{isLoading ? (
						<p>Loading activity history...</p>
					) : activityHistoryList.length === 0 ? (
						<p>No activity history found.</p>
					) : (
						activityHistoryList.map((activity) => (
							<div
								key={activity.id}
								className='p-2 border-b flex justify-around items-center w-full pr-5 sm:justify-center'
							>
								<div className='w-full sm:w-1/3'>
									<p className='font-bold'>{activity.activityName}</p>
									<p className='text-sm text-gray-600'>
										{formatCategory(activity.category)} | {activity.date}
									</p>
									<p>
										{activity.amount} {formatUnits(activity.units)}
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
					)}
				</div>
			</div>
		</ProtectedRoute>
	);
}

'use client';

//External Libraries/Modules
import { use, useEffect, useState } from 'react';
import ProtectedRoute from '@/components/protectedRoute';
import { toast } from 'sonner';
import Modal from '@/components/ui/shadcn/modal';

//Internal Components
import NavBar from '@/components/ui/navBar';
import PinActivityButton from '@/components/ui/pinActivityButton';
import LogActivityForm from '@/components/ui/logActivityForm';

//Custom Hooks/Functions
import getCategoryActivitiesList from '@/lib/carbon/getCategoryActivitiesList';
import { formatCategory } from '@/utils/formatting';

export default function History({ params }) {
	const { category } = use(params);
	const [activitiesList, setActivitiesList] = useState(null);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const validCategories = ['travel', 'energy-home', 'food-drink', 'lifestyle'];
	if (!validCategories.includes(category)) {
		return <p>Invalid category</p>;
	}

	const getActivities = async () => {
		const results = await getCategoryActivitiesList(category);
		const sorted = results.sort((a, b) => a.name.localeCompare(b.name));
		setActivitiesList(sorted);
	};

	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
	};

	useEffect(() => {
		getActivities();
	}, []);

	if (!activitiesList) {
		return <div>Loading...</div>;
	}

	return (
		<ProtectedRoute>
			<NavBar onDashboard={false} />
			<div className='pt-30 flex flex-col justify-center items-center'>
				<h3 className='text-3xl font-bold mb-4'>{formatCategory(category)}</h3>
				<div className='mt-2 w-2/3 flex flex-col justify-center items-center text-center gap-1'>
					{activitiesList.map((activity) => {
						return (
							<div
								key={activity.id}
								onClick={() => handleSelect(activity)}
								className='p-2 cursor-pointer w-1/2 bg-white dark:bg-gray-800 border rounded shadow '
							>
								<h4>{activity.name}</h4>
							</div>
						);
					})}
				</div>
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					className='relative'
				>
					<PinActivityButton
						activity={selectedActivity}
						onSuccess={(successMessage) => toast.success(successMessage)}
						onError={(err) => toast.error(err)}
					/>
					<LogActivityForm
						activity={selectedActivity}
						onSuccess={() => {
							setIsModalOpen(false);
							toast.success('Successfully logged activity!');
						}}
						onError={(err) => toast.error(err)}
					/>
				</Modal>
			</div>
		</ProtectedRoute>
	);
}

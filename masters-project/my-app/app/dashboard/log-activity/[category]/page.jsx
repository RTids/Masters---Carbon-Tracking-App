'use client';

import { use, useEffect, useState } from 'react';
import ProtectedRoute from '@/components/protectedRoute';
import NavBar from '@/components/ui/navBar';
import Modal from '@/components/ui/modal';
import PinActivityButton from '@/components/ui/pinActivityButton';
import LogActivityForm from '@/components/ui/logActivityForm';
import getCategoryActivitiesList from '@/lib/carbon/getCategoryActivitiesList';
import { toast } from 'sonner';

export default function History({ params }) {
	const { category } = use(params);
	const [activitiesList, setActivitiesList] = useState(null);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const validCategories = ['travel', 'energy-home', 'food-drink', 'lifestyle'];
	if (!validCategories.includes(category)) {
		return <p>Invalid category</p>;
	}

	const getActivities = async () => {
		const results = await getCategoryActivitiesList(category);
		setActivitiesList(results);
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
				<h1>Category</h1>
				<h3>{category}</h3>
				{activitiesList.map((activity) => {
					return (
						<div key={activity.id} onClick={() => handleSelect(activity)}>
							<h4>{activity.name}</h4>
						</div>
					);
				})}
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

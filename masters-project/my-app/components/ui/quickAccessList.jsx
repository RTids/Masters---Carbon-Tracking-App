import displayPinnedList from '@/lib/carbon/displayPinnedActivities';
import { useEffect, useState } from 'react';
import Modal from './modal';
import PinActivityButton from './pinActivityButton';
import LogActivityForm from './logActivityForm';
import { toast } from 'sonner';

export default function QuickAccessList() {
	const [pinnedActivities, setPinnedActivities] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedActivity, setSelectedActivity] = useState(null);

	const loadPinnedList = async () => {
		const list = await displayPinnedList();
		setPinnedActivities(list);
	};

	useEffect(() => {
		loadPinnedList();
	}, []);

	//When clicking an activity in the search list, open modal and set selected activity
	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
	};

	return (
		<div>
			<h3>Quick Access Activities</h3>
			{!pinnedActivities ? (
				<div>Loading...</div>
			) : (
				pinnedActivities.map((activity) => {
					return (
						<h4 key={activity.id} onClick={() => handleSelect(activity)}>
							{activity.name}
						</h4>
					);
				})
			)}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<PinActivityButton
					activity={selectedActivity}
					onSuccess={(successMessage) => {
						toast.success(successMessage);
						loadPinnedList();
					}}
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
	);
}

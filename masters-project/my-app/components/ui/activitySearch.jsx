import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Modal from './modal';
import logActivity from '@/lib/carbon/logActivity';
import { toast } from 'sonner';
import LogActivityForm from './logActivityForm';

export default function ActivitySearch({ activityList }) {
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(true);

	if (!activityList) return <p>Loading activities...</p>;

	const filteredActivites = activityList.filter((activity) =>
		activity.tags?.some((tag) =>
			tag.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	//When clicking an activity in the search list, open modal and set selected activity
	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
		setLoading(false);
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Search Activity'
				id='activitySearchBox'
				onChange={(e) => setSearchTerm(e.target.value)}
			></input>
			<h3>Search Result</h3>
			{searchTerm.length > 0 && (
				<ul>
					{filteredActivites.map((activity) => {
						return (
							<li key={activity.id} onClick={() => handleSelect(activity)}>
								{activity.name}
							</li>
						);
					})}
				</ul>
			)}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<LogActivityForm
					activity={selectedActivity}
					onSuccess={() => {
						setIsModalOpen(false);
						setSearchTerm('');
						toast.success('Successfully logged activity!');
					}}
					onError={(err) => toast.error(err)}
				/>
			</Modal>
		</div>
	);
}

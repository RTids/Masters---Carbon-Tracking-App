import getActivitiesList from '../../lib/carbon/getActivitiesList';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Modal from './modal';
import logActivity from '@/lib/carbon/logActivity';
import { toast } from 'sonner';

export default function ActivitySearch() {
	const [activityList, setActivityList] = useState([]);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchActivitiesList = async () => {
			const supabase = createClient();
			const { data: sessionData, error: sessionError } =
				await supabase.auth.getUser();

			if (sessionError || !sessionData)
				throw new Error('User not authenticated.');
			try {
				const data = await getActivitiesList();
				setActivityList(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchActivitiesList();
	}, []);

	const filteredActivites = activityList.filter((activity) =>
		activity.tags?.some((tag) =>
			tag.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	//When clicking an activity in the search list, open modal and set selected activity
	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const result = await logActivity(amount, selectedActivity);

		setLoading(false);

		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success('Successfully logged activity!');
		}
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
				{selectedActivity ? (
					<div>
						<h2>{selectedActivity.name}</h2>
						<h4>{selectedActivity.emissions_per_unit}</h4>
						<form onSubmit={handleSubmit}>
							<input
								id='amount'
								name='amount'
								type='number'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<label htmlFor='amount'>{selectedActivity.unit}</label>
							<button type='submit'>Log</button>
						</form>
					</div>
				) : (
					<p>'No selected activity.'</p>
				)}
			</Modal>
		</div>
	);
}

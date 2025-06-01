import { useState, useEffect } from 'react';
import Modal from './modal';
import { toast } from 'sonner';
import LogActivityForm from './logActivityForm';
import PinActivityButton from './pinActivityButton';

export default function ActivitySearch({ activityList }) {
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(true);

	if (!activityList) return <p>Loading activities...</p>;

	const filteredActivites = activityList.filter(
		(activity) =>
			!activity.tags?.includes('hidden') &&
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
		<div className='flex flex-col gap-2 w-2/3 h-15 mt-5'>
			<div className='relative w-full items-center flex flex-col text-center'>
				<input
					className='text-center'
					type='text'
					placeholder='Search Activity...'
					id='activitySearchBox'
					onChange={(e) => setSearchTerm(e.target.value)}
				></input>
				{searchTerm.length > 0 && (
					<div className='absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border rounded shadow z-10 max-h-60 overflow-y-auto'>
						{filteredActivites.length > 0 ? (
							<ul>
								{filteredActivites.map((activity) => {
									return (
										<li
											className='cursor-pointer'
											key={activity.id}
											onClick={() => handleSelect(activity)}
										>
											{activity.name}
										</li>
									);
								})}
							</ul>
						) : (
							<div className='p-3 text-gray-500 text-center'>
								No results found
							</div>
						)}
					</div>
				)}
			</div>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<PinActivityButton
					activity={selectedActivity}
					onSuccess={(successMessage) => toast.success(successMessage)}
					onError={(err) => toast.error(err)}
				/>
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

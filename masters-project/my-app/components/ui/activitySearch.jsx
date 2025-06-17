//External Libraries / Modules
import { useState } from 'react';
import { toast } from 'sonner';

//Internal Components
import LogActivityForm from './logActivityForm';
import PinActivityButton from './pinActivityButton';
import Modal from './modal';

//Custom Hooks / Functions
import { useActivitySearch } from '@/app/hooks/useActivitySearch';

export default function ActivitySearch({
	activityList,
	isModalOpen,
	setIsModalOpen,
}) {
	const [selectedActivity, setSelectedActivity] = useState(null);

	const {
		searchTerm,
		setSearchTerm,
		filteredActivities,
		hasResults,
		isSearching,
		clearSearch,
	} = useActivitySearch(activityList);

	//If the activities list has not yet loaded and is showing empty, show this:
	if (!activityList) return <p>Loading activities...</p>;

	//When clicking an activity in the search list, open modal and set selected activity
	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
	};

	return (
		<div className={`flex flex-col gap-2 w-2/3 h-15 mt-5`}>
			<div className='relative w-full items-center flex flex-col text-center'>
				<input
					className='text-center'
					type='text'
					placeholder='Search Activity...'
					id='activitySearchBox'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				></input>
				{isSearching && (
					<div className='absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border rounded shadow z-10 max-h-60 overflow-y-auto mt-2'>
						{hasResults ? (
							<ul>
								{filteredActivities.map((activity) => {
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
						clearSearch();
						toast.success('Successfully logged activity!');
					}}
					onError={(err) => toast.error(err)}
				/>
			</Modal>
		</div>
	);
}

import getActivitiesList from '../../lib/carbon/getActivitiesList';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ActivitySearch() {
	const [activityList, setActivityList] = useState([]);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');

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
							<li
								key={activity.id}
								onClick={() => setSelectedActivity(activity)}
							>
								{activity.name}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

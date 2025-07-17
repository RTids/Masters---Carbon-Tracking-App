//Custom Hooks / Functions
import getActivitiesList from './getActivitiesList';
import getActivityHistory from './getActivityHistory';

export default async function displayActivityHistory() {
	const activityList = await getActivitiesList();
	const historyList = await getActivityHistory();

	const activityMap = new Map(
		activityList.map((activity) => [activity.id, activity])
	);

	const combinedList = historyList
		.map((historyItem) => {
			const activity = activityMap.get(historyItem.activity_id);
			if (!activity) return null;

			const formattedDate = new Date(historyItem.date_logged).toLocaleString(
				'en-GB',
				{
					hour: '2-digit',
					minute: '2-digit',
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				}
			);

			return {
				activityName: activity.name,
				category: activity.category,
				icon: activity.icon,
				units: activity.unit,

				id: historyItem.id,
				amount: historyItem.amount,
				totalEmissions: historyItem.calculated_emissions,
				date: formattedDate,
			};
		})
		.filter(Boolean); // Remove nulls in case activity was missing

	//Sort by most recent date first
	combinedList.sort((a, b) => new Date(b.date) - new Date(a.date));

	return combinedList;
}

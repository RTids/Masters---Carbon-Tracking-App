import getActivitiesList from './getActivitiesList';
import getPinnedActivities from './getPinnedActivities';

export default async function displayPinnedList() {
	const activityList = await getActivitiesList();
	const pinnedList = await getPinnedActivities();

	const activityMatch = new Set(pinnedList.map((item) => item.activity_id));
	const results = activityList.filter((item) => {
		return activityMatch.has(item.id);
	});

	return results;
}

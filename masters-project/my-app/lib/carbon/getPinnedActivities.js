//External Libaries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getPinnedActivities() {
	const supabase = createClient();

	const { data: pinnedTasksData, error: activityError } = await supabase
		.from('pinned_tasks')
		.select('*');

	return pinnedTasksData;
}

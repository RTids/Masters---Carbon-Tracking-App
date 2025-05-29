import { createClient } from '@/utils/supabase/client';

export default async function getPinnedActivities() {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const { data: pinnedTasksData, error: activityError } = await supabase
		.from('pinned_tasks')
		.select('*');

	return pinnedTasksData;
}

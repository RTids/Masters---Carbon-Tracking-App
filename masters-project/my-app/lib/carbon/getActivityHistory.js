import { createClient } from '@/utils/supabase/client';

export default async function getActivityHistory() {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const { data: activityHistoryData, error: activityError } = await supabase
		.from('user_activity_logs')
		.select('*');

	return activityHistoryData;
}

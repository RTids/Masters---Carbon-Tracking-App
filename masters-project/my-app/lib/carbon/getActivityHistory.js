//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getActivityHistory() {
	const supabase = createClient();

	const { data: activityHistoryData, error: activityError } = await supabase
		.from('user_activity_logs')
		.select('*');

	return activityHistoryData;
}

//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getActivitiesList() {
	const supabase = createClient();

	const { data: activityData, error: activityError } = await supabase
		.from('activities')
		.select('*');

	return activityData;
}

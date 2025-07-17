//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getCategoryActivitiesList(category) {
	const supabase = createClient();

	const { data: activityData, error: activityError } = await supabase
		.from('activities')
		.select('*')
		.eq('category', category);

	return activityData;
}

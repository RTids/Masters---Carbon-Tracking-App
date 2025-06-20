import { createClient } from '@/utils/supabase/client';

export default async function getCategoryActivitiesList(category) {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const { data: activityData, error: activityError } = await supabase
		.from('activities')
		.select('*')
		.eq('category', category);

	return activityData;
}

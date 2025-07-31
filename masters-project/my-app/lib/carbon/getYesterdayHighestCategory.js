//External Libaries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function getYesterdayHighestCategory() {
	const supabase = createClient();
	const user = await getAuthenticatedUser();

	const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

	const { data: yesterdayData, error: activityError } = await supabase
		.from('daily_totals')
		.select('*')
		.eq('user_id', user.id)
		.gte('date', `${yesterday}T00:00:00`)
		.lt('date', `${yesterday}T23:59:59`);

	const categoryObject = yesterdayData[0]['category_breakdown'];
	const sorted = Object.entries(categoryObject).sort(([, a], [, b]) => b - a);
	const highestCategory = sorted[0][0];

	return highestCategory;
}

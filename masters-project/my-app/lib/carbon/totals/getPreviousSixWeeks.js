//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function getPreviousSixWeeks() {
	const supabase = createClient();
	const user = await getAuthenticatedUser();

	//Here we get todays date and the date 6 weeks ago, we are going to pull todays emissions based on the
	//currently logged emissions for the day
	const today = new Date();
	//6 Weeks ago
	const startDate = new Date(today);
	startDate.setDate(today.getDate() - 40);
	//Yesterday
	const endDate = new Date(today);
	endDate.setDate(today.getDate() - 1);

	//Now we convert these into strings that our database can read
	const startDateString = startDate.toISOString().split('T')[0] + 'T00:00:00Z';
	const endDateString = endDate.toISOString().split('T')[0] + 'T23:59:59Z';

	const { data: monthlyData, error: totalError } = await supabase
		.from('weekly_totals')
		.select('*')
		.eq('user_id', user.id)
		.gte('week_start', startDateString)
		.lte('week_start', endDateString);

	if (totalError) {
		throw new Error(totalError.message);
	}

	return monthlyData;
}

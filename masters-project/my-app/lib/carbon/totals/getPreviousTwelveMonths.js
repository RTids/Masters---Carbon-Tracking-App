//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getPreviousTwelveMonths() {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	//Here we get todays date and the date 6 days ago, we are going to pull todays emissions based on the
	//currently logged emissions for the day
	const today = new Date();
	//6 Days ago
	const startDate = new Date(today);
	startDate.setFullYear(starts.getFullYear() - 1);
	//Yesterday
	const endDate = new Date(today);
	endDate.setDate(today.getDate() - 1);

	//Now we convert these into strings that our database can read
	const startDateString = startDate.toISOString().split('T')[0] + 'T00:00:00Z';
	const endDateString = endDate.toISOString().split('T')[0] + 'T23:59:59Z';

	const { data: yearlyData, error: totalError } = await supabase
		.from('monthly_totals')
		.select('*')
		.eq('user_id', sessionData.user.id)
		.gte('month_start', startDateString)
		.lte('month_start', endDateString);

	if (totalError) {
		throw new Error(totalError.message);
	}

	return yearlyData;
}

//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getPreviousSixDays() {
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
	startDate.setDate(today.getDate() - 6);
	//Yesterday
	const endDate = new Date(today);
	endDate.setDate(today.getDate() - 1);

	//Now we convert these into strings that our database can read
	const startDateString = startDate.toISOString().split('T')[0] + 'T00:00:00Z';
	const endDateString = endDate.toISOString().split('T')[0] + 'T23:59:59Z';

	const { data: weeklyData, error: totalError } = await supabase
		.from('daily_totals')
		.select('*')
		.eq('user_id', sessionData.user.id)
		.gte('date', startDateString)
		.lte('date', endDateString);

	if (totalError) {
		throw new Error(totalError.message);
	}

	return weeklyData;
}
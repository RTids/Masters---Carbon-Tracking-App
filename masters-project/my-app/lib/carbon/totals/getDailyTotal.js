//External Libraries / Functions
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function getDailyTotal() {
	const supabase = createClient();
	const user = await getAuthenticatedUser();

	const today = new Date().toISOString().split('T')[0];

	const { data: totalData, error: totalError } = await supabase
		.from('user_activity_logs')
		.select('*')
		.eq('user_id', user.id)
		.gte('date_logged', `${today}T00:00:00`)
		.lt('date_logged', `${today}T23:59:59`);

	if (totalError) {
		throw new Error(totalError.message);
	}

	const dailyEmissions = totalData.reduce((total, item) => {
		return total + item.calculated_emissions;
	}, 0);

	const dailyEmissionsObject = {
		total: dailyEmissions,
		date: today,
	};

	return dailyEmissionsObject;
}

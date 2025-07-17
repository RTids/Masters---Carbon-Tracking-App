//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';


export default async function getYesterdayTotal() {
	const supabase = createClient();
	const user = await getAuthenticatedUser()

	const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

	const { data: totalData, error: totalError } = await supabase
		.from('user_activity_logs')
		.select('*')
		.eq('user_id', user.id)
		.gte('date_logged', `${yesterday}T00:00:00`)
		.lt('date_logged', `${yesterday}T23:59:59`);

	if (totalError) {
		throw new Error(totalError.message);
	}

	const yesterdayEmissions = totalData.reduce((total, item) => {
		return total + item.calculated_emissions;
	}, 0);

	return yesterdayEmissions;
}

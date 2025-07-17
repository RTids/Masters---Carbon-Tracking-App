//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function logActivity(amount, selectedActivity, date) {
	const supabase = createClient();
	const user = await getAuthenticatedUser()

	const emissions = amount * selectedActivity.emissions_per_unit;

	const { error: supabaseError } = await supabase
		.from('user_activity_logs')
		.insert({
			user_id: user.id,
			activity_id: selectedActivity.id,
			amount: amount,
			calculated_emissions: emissions,
			date_logged: date,
		});

	if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true };
}

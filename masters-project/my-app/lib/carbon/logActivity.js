import { createClient } from '@/utils/supabase/client';

export default async function logActivity(amount, selectedActivity) {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const emissions = amount * selectedActivity.emissions_per_unit;

	const {error: supabaseError} = await supabase.from('user_activity_logs').insert({user_id: sessionData.user.id, activity_id: selectedActivity.id, amount: amount, calculated_emissions: emissions})

    if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true };
}

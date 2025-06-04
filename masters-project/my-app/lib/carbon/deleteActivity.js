import { createClient } from '@/utils/supabase/client';

export default async function deleteActivity(selectedActivity) {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const { error: supabaseError } = await supabase
		.from('user_activity_logs')
		.delete()
		.eq('id', selectedActivity);

	if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true };
}

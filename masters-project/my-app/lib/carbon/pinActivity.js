import { createClient } from '@/utils/supabase/client';

export default async function pinActivity(activity, isPinned) {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	let supabaseError = null;
	let successMessage = null;

	if (!isPinned) {
		const { error } = await supabase.from('pinned_tasks').insert({
			user_id: sessionData.user.id,
			activity_id: activity.id,
		});
		supabaseError = error;
		successMessage = 'Pinned to Quick Access';
	}

	if (isPinned) {
		const { error } = await supabase
			.from('pinned_tasks')
			.delete()
			.eq('user_id', sessionData.user.id)
			.eq('activity_id', activity.id);
		supabaseError = error;
		successMessage = 'Removed from Quick Access';
	}

	if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true, message: successMessage };
}

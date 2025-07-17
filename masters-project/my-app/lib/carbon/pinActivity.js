//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function pinActivity(activity, isPinned) {
	const supabase = createClient();
	const user = await getAuthenticatedUser();

	let supabaseError = null;
	let successMessage = null;

	if (!isPinned) {
		const { error } = await supabase.from('pinned_tasks').insert({
			user_id: user.id,
			activity_id: activity.id,
		});
		supabaseError = error;
		successMessage = 'Pinned to Quick Access';
	}

	if (isPinned) {
		const { error } = await supabase
			.from('pinned_tasks')
			.delete()
			.eq('user_id', user.id)
			.eq('activity_id', activity.id);
		supabaseError = error;
		successMessage = 'Removed from Quick Access';
	}

	if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true, message: successMessage };
}

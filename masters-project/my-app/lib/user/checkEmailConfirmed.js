//External Libraries / Functions
import { createClient } from '@/utils/supabase/client';

export function getConfirmedProfile(userId) {
	if (!userId) throw new Error('User not authenticated.');

	const supabase = createClient();

	return supabase
		.from('profiles')
		.select('email_confirmed_at')
		.eq('id', userId)
		.single();
}

//External Libraries / Functions
import { createClient } from '@/utils/supabase/client';

export default async function getConfirmedProfile(userId) {
	if (!userId) throw new Error('User not authenticated.');

	const supabase = createClient();

	const { data, error } = await supabase
		.from('profiles')
		.select('email_confirmed_at')
		.eq('id', userId)
		.single();

	if (error) {
		console.error('Error fetching profile:', error);
		return null;
	}

	return data;
}

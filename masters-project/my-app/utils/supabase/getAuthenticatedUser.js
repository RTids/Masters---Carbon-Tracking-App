import { data } from 'autoprefixer';
import { createClient } from './client';

export default async function getAuthenticatedUser() {
	const supabase = createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data.user) throw new Error('User not authenticated.');

	return data.user;
}

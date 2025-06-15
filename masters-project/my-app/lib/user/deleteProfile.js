import { createClient } from '@/utils/supabase/client';

export default async function deleteAccount() {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const { error: supabaseError } = await supabase
		.from('profiles')
		.delete()
		.eq('id', sessionData.user.id);

	if (supabaseError) {
		return { error: supabaseError.message };
	}
	const { error } = await supabase.auth.signOut();
	if (error) throw error;

	return { success: true };
}

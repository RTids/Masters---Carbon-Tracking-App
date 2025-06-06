import { createClient } from '@/utils/supabase/client';

export default async function updateProfile(firstName, lastName) {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user)
		throw new Error('User not authenticated.');

	const { error: supabaseError } = await supabase
		.from('profiles')
		.update({ first_name: firstName, last_name: lastName })
		.eq('id', sessionData.user.id);

	if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true };
}

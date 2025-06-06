import { createClient } from '@/utils/supabase/client';

export default async function getProfileData() {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData) {
		throw new Error('User not authenticated.');
	}

	const { data: profileData, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', sessionData.user.id)
		.single();

	return profileData;
}

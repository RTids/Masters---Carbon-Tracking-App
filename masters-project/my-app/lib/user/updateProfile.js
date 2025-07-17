//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function updateProfile(firstName, lastName) {
	const supabase = createClient();
	const user = await getAuthenticatedUser()

	const { error: supabaseError } = await supabase
		.from('profiles')
		.update({ first_name: firstName, last_name: lastName })
		.eq('id', user.id);

	if (supabaseError) {
		return { error: supabaseError.message };
	}

	return { success: true };
}
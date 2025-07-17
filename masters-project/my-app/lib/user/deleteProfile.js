//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

//Custom Hooks / Functions
import getAuthenticatedUser from '@/utils/supabase/getAuthenticatedUser';

export default async function deleteAccount() {
	const supabase = createClient();
	const user = await getAuthenticatedUser()

	const { error: supabaseError } = await supabase
		.from('profiles')
		.delete()
		.eq('id', user.id);

	if (supabaseError) {
		return { error: supabaseError.message };
	}
	const { error } = await supabase.auth.signOut();
	if (error) throw error;

	return { success: true };
}

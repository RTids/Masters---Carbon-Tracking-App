//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function signOut() {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
}

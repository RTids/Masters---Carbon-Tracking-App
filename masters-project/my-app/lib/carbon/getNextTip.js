//External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getNextTip() {
	const supabase = createClient();

	// Call the RPC function without passing userId,
	// as the DB function uses auth.uid() internally
	const { data: tips, error: tipError } = await supabase.rpc('get_next_tip');

	if (tipError) {
		throw new Error(`Failed to get tip: ${tipError.message}`);
	}

	// tip will be an array of tips, so return the first one or null if empty
	return tips?.[0] ?? null;
}

// External Libraries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getPreviousWeekTotal() {
	const supabase = createClient();
	const { data: sessionData, error: sessionError } =
		await supabase.auth.getUser();

	if (sessionError || !sessionData.user) {
		throw new Error('User not authenticated.');
	}

	// Get start of this week (Monday UTC)
	const now = new Date();
	const day = now.getUTCDay(); // 0 = Sunday, 1 = Monday, ...
	const daysSinceMonday = (day + 6) % 7;

	const startOfThisWeek = new Date(
		Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate() - daysSinceMonday,
			0,
			0,
			0
		)
	);

	// Start of previous week
	const startOfPreviousWeek = new Date(startOfThisWeek);
	startOfPreviousWeek.setUTCDate(startOfThisWeek.getUTCDate() - 7);

	// Convert to ISO strings for query
	const startOfPreviousWeekStr = startOfPreviousWeek.toISOString(); // inclusive
	const startOfThisWeekStr = startOfThisWeek.toISOString(); // exclusive

	// Supabase query using range
	const { data: totalData, error: totalError } = await supabase
		.from('weekly_totals')
		.select('*')
		.eq('user_id', sessionData.user.id)
		.gte('week_start', startOfPreviousWeekStr)
		.lt('week_start', startOfThisWeekStr);

	if (totalError) {
		throw new Error(totalError.message);
	}

	// Sum all totals (in case there are multiple rows)
	const weeklyTotal = totalData.reduce((sum, row) => sum + row.total, 0);

	console.log('Previous week records:', totalData);
	console.log('Range:', startOfPreviousWeekStr, '→', startOfThisWeekStr);
	console.log('Weekly total:', weeklyTotal);

	return weeklyTotal;
}

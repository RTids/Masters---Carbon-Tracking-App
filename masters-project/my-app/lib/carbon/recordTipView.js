import { createClient } from '@/utils/supabase/client';

export default async function recordTipView(userId, tipId) {
	const supabase = createClient();

	// Check if user has already viewed this tip
	const { data, error } = await supabase
		.from('emissions_tips_viewed')
		.select('views')
		.eq('user_id', userId)
		.eq('tips_id', tipId)
		.single();

	if (error && error.code !== 'PGRST116') {
		console.error('Error fetching tip view:', error.message);
		return;
	}

	if (data) {
		const { error: updateError } = await supabase
			.from('emissions_tips_viewed')
			.update({ views: data.views + 1 })
			.eq('user_id', userId)
			.eq('tips_id', tipId);

		if (updateError)
			console.error('Error updating view count:', updateError.message);
	} else {
		const { error: insertError } = await supabase
			.from('emissions_tips_viewed')
			.insert({
				user_id: userId,
				tips_id: tipId,
				views: 1,
			});

		if (insertError)
			console.error('Error inserting new tip view:', insertError.message);
	}
}

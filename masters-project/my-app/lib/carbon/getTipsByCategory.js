//External Libaries / Modules
import { createClient } from '@/utils/supabase/client';

export default async function getTipsByCategory(category) {
	const supabase = createClient();

	const { data: categoryTips, error: tipsError } = await supabase
		.from('emission_tips')
		.select('*')
		.eq('category', category);

	if (tipsError) {
		console.error('Error fetching tips:', tipsError.message);
		return [];
	}

	const randomCategoryTip =
		categoryTips[Math.floor(Math.random() * categoryTips.length)];

	return randomCategoryTip;
}

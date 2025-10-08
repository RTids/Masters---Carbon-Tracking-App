//Custom Hooks/Functions
import getTipsByCategory from './getTipsByCategory';
import getNextTip from './getNextTip';

export default async function getBestTip(category) {
	if (category) {
		const tip = await getTipsByCategory(category);
		if (tip) return tip;
	}

	// Fallback to a random tip based on the leaset viewed one by the user if there is not a highest
	//category from yesterday e.g no logged activities
	const tip = await getNextTip();
	if (tip) return tip;

	if (error) {
		console.error('Error fetching next tip:', error.message);
		return null;
	}

	return tip;
}

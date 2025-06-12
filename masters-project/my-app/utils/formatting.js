function formatCategory(category) {
	const words = category.split('-');
	const capitalWords = words.map((word) => capitalize(word));
	const result = capitalWords.join('/');
	return result;
}

const formatUnits = (unit) => {
	const formatted = unit.split(/[-_]/)[0];
	return formatted;
};

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export { formatCategory, formatUnits, capitalize };

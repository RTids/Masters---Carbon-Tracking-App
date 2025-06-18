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

function formatDate(isoString) {
	const d = new Date(isoString);
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = String(d.getFullYear()).slice(-2);
	return `${day}/${month}/${year}`;
}

export { formatCategory, formatUnits, capitalize, formatDate };

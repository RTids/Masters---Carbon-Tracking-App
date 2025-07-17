import { useCallback, useMemo, useState } from 'react';

export const useActivitySearch = (activityList) => {
	const [searchTerm, setSearchTerm] = useState('');

	//Function to filter actitivies from our full activites list as user types in search box
	const filteredActivities = useMemo(() => {
		if (!searchTerm.trim() || !activityList) return [];

		//Convert search term to lower case
		const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

		//Filters out the activities with the hidden tag in the database
		return activityList.filter((activity) => {
			if (activity?.tags.includes('hidden')) return false;

			//Gets the activities that starts with the users current search input
			const match = activity.tags?.some((tag) => {
				return tag.toLowerCase().startsWith(lowerCaseSearchTerm);
			});

			return match;
		});
	}, [activityList, searchTerm]);

	//Function to clear the search term
	const clearSearch = useCallback(() => {
		setSearchTerm('');
	}, []);

	return {
		searchTerm,
		setSearchTerm,
		filteredActivities,
		clearSearch,
		hasResults: filteredActivities.length > 0,
		isSearching: searchTerm.length > 0,
	};
};

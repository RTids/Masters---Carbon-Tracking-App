//External Libraries / Modules
import { useEffect, useState } from 'react';

//Custom Hooks/Functions
import getProfileData from '@/lib/user/getProfile';

export const useProfileData = () => {
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfileData = async () => {
			const data = await getProfileData();
			setProfile(data);
			setIsLoading(false);
		};
		fetchProfileData();
	}, []);
	return {
		profile,
		isLoading,
	};
};

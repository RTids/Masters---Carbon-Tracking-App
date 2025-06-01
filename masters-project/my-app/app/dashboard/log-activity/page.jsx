'use client';
import { useState, useEffect } from 'react';
import getActivitiesList from '@/lib/carbon/getActivitiesList';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

//Import custom components
import ActivitySearch from '@/components/ui/activitySearch';
import BackButton from '@/components/ui/backButton';
import NavBar from '@/components/ui/navBar';
import CategoryGrid from '@/components/ui/categoryGrid';

export default function LogActivity() {
	const router = useRouter();
	const [activityList, setActivityList] = useState(null);

	useEffect(() => {
		const fetchActivitiesList = async () => {
			const supabase = createClient();
			const { data: sessionData, error: sessionError } =
				await supabase.auth.getUser();

			if (sessionError || !sessionData)
				throw new Error('User not authenticated.');
			try {
				const data = await getActivitiesList();
				setActivityList(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchActivitiesList();
	}, []);

	return (
		<div className='w-full flex flex-col justify-around items-center gap-4 h-screen pt-20'>
			<NavBar onDashboard={false} />
			<ActivitySearch activityList={activityList} />
			<CategoryGrid />
		</div>
	);
}

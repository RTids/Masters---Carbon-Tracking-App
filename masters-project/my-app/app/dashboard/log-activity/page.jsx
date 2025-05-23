'use client';
import { useState, useEffect } from 'react';
import getActivitiesList from '@/lib/carbon/getActivitiesList';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

//Import custom components
import ActivitySearch from '@/components/ui/activitySearch';

export default function LogActivity() {
	const router = useRouter();
	const [activitiesList, setActivitiesList] = useState(null);

	useEffect(() => {
		const fetchActivitiesList = async () => {
			try {
				const data = await getActivitiesList();
				setActivitiesList(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchActivitiesList();
	}, []);

	return (
		<>
			<ActivitySearch />
			<br></br>
			<br></br>
			<br></br>
			<div>
				<p>Food/Drink</p>
				<p>Travel</p>
				<p>Energy/Home</p>
				<p>Lifestyle</p>
			</div>
		</>
	);
}

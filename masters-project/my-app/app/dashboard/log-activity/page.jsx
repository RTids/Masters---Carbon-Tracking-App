'use client';
import { useState, useEffect } from 'react';
import getActivitiesList from '@/app/lib/carbon/getActivitiesList';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

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
			<p>Search Box</p>
			<div>
				<p>Food/Drink</p>
				<p>Travel</p>
				<p>Energy/Home</p>
				<p>Lifestyle</p>
			</div>
		</>
	);
}

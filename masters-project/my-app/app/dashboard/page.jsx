'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

//Import our components
import WelcomeMessage from '../components/welcomeMessage';
import Loading from '../components/loading';
import { useRouter } from 'next/navigation';
import getProfileData from '../lib/user/getProfile';
import SignOutButton from '../components/signOutButton';
import LogActivity from './log-activity/page';

export default function Dashboard() {
	const supabase = createClient();
	const [profile, setProfile] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const data = await getProfileData();
				setProfile(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchProfileData();
	}, []);

	return (
		<div>
			{!profile && <Loading />}
			{profile && <WelcomeMessage name={profile.first_name} />}
			<button
				onClick={() => {
					router.push('/dashboard/log-activity');
				}}
			>
				Log Activity
			</button>
			<SignOutButton />
		</div>
	);
}

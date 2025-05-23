'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//Import our components
import WelcomeMessage from '@/components/ui/welcomeMessage';
import Loading from '@/components/ui/loading';
import getProfileData from '../../lib/user/getProfile';
import SignOutButton from '@/components/ui/signOutButton';
import LogActivity from './log-activity/page';

export default function Dashboard() {
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
			<Link href={'/dashboard/log-activity'}>Log Activity</Link>
			<SignOutButton />
		</div>
	);
}

'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//Import our components
import WelcomeMessage from '@/components/ui/welcomeMessage';
import Loading from '@/components/ui/loading';
import getProfileData from '../../lib/user/getProfile';
import SignOutButton from '@/components/ui/signOutButton';
import QuickAccessList from '@/components/ui/quickAccessList';

export default function Dashboard() {
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchProfileData = async () => {
			const supabase = createClient();

			const { data: userData, error: userError } =
				await supabase.auth.getUser();

			if (userError || !userData?.user) {
				router.push('/login');
			}

			try {
				const data = await getProfileData();
				setProfile(data);
			} catch (err) {
				console.log(err);
			}
			setIsLoading(false);
		};
		fetchProfileData();
	}, [router]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='flex flex-col items-center w-full'>
			{profile && <WelcomeMessage name={profile.first_name} />}
			<QuickAccessList />
			<Link href={'/dashboard/log-activity'}>Log Activity</Link>
			<SignOutButton />
		</div>
	);
}

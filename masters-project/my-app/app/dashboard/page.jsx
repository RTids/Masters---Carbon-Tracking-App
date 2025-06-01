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
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/darkModeToggleButton';
import NavBar from '@/components/ui/navBar';

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
		<div className='flex flex-col items-center gap-3 w-full pt-20'>
			<NavBar onDashboard={true} />
			{profile && <WelcomeMessage name={profile.first_name} />}
			<QuickAccessList />
			<Button asChild variant='outline' className='w-2/3 h-[50px]'>
				<Link href={'/dashboard/log-activity'}>Log Activity</Link>
			</Button>
			<SignOutButton />
		</div>
	);
}

//Add images/icons to activities database that we can display with them
//Maybe use a Card component for the 'Modal'
//Create nav bar that will be display on all pages (Include dark mode/light mode toggle)
//Think about changing colours for site

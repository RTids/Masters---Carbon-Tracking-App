'use client';
import { useEffect, useState, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//Import our components
import ProtectedRoute from '@/components/protectedRoute';
import WelcomeMessage from '@/components/ui/welcomeMessage';
import Loading from '@/components/ui/loading';
import getProfileData from '../../lib/user/getProfile';
import QuickAccessList from '@/components/ui/quickAccessList';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/ui/navBar';
import DailyEmissions from '@/components/ui/dailyEmissions';
import RandomTip from '@/components/ui/randomTip';

export default function Dashboard() {
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
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
		<ProtectedRoute>
			<div
				className={`flex flex-col justify-center items-center gap-2 w-full pt-20 ${
					isModalOpen ? 'blur-sm' : ''
				}`}
			>
				<NavBar onDashboard={true} />
				{profile && <WelcomeMessage name={profile.first_name} />}
				<QuickAccessList
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
				<Button asChild variant='outline' className='w-2/3 h-[50px]'>
					<Link href={'/dashboard/log-activity'}>Log Activity</Link>
				</Button>
				<DailyEmissions isModalOpen={isModalOpen} />
				<RandomTip />
				<div className='flex flex-row w-2/3 justify-center gap-5'>
					<Button
						asChild
						variant='outline'
						className='h-[100px] w-[140px] sm:w-1/3'
					>
						<Link href='/dashboard/my-footprint'>My Footprint</Link>
					</Button>
					<Button
						asChild
						variant='outline'
						className='h-[100px] w-[140px] sm:w-1/3'
					>
						<Link href='/dashboard/settings'>Settings</Link>
					</Button>
				</div>
			</div>
		</ProtectedRoute>
	);
}

//Maybe use a Card component for the 'Modal'
//Think about changing colours for site

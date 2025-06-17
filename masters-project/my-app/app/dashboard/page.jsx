'use client';

//External Libraries / Modules
import { useState } from 'react';
import Link from 'next/link';

//Internal Components
import ProtectedRoute from '@/components/protectedRoute';
import WelcomeMessage from '@/components/ui/welcomeMessage';
import QuickAccessList from '@/components/ui/quickAccessList';
import { Button } from '@/components/ui/buttons/button';
import NavBar from '@/components/ui/navBar';
import DailyEmissions from '@/components/ui/dailyEmissions';
import RandomTip from '@/components/ui/randomTip';

//Custom Hooks / Functions
import { useProfileData } from '../hooks/useProfileData';

export default function Dashboard() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { profile, isLoading } = useProfileData();

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	return (
		<ProtectedRoute>
			<div
				className={`flex flex-col justify-center items-center gap-2 w-full pt-30 ${
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

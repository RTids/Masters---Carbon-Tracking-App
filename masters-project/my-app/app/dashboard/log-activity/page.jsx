'use client';

import { useState, useEffect } from 'react';
import getActivitiesList from '@/lib/carbon/getActivitiesList';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

//Import custom components
import ProtectedRoute from '@/components/protectedRoute';
import ActivitySearch from '@/components/ui/activitySearch';
import { Button } from '@/components/ui/buttons/button';
import NavBar from '@/components/ui/navBar';
import CategoryGrid from '@/components/ui/categoryGrid';
import Link from 'next/link';

export default function LogActivity() {
	const router = useRouter();
	const [activityList, setActivityList] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchActivitiesList = async () => {
			const data = await getActivitiesList();
			setActivityList(data);
		};
		fetchActivitiesList();
	}, []);

	return (
		<ProtectedRoute>
			<div
				className={`flex flex-col justify-center items-center ${
					isModalOpen ? 'blur-sm' : ''
				}`}
			>
				<NavBar onDashboard={false} />
				<div className='w-full flex flex-col justify-around items-center gap-4 h-screen pt-40'>
					<ActivitySearch
						activityList={activityList}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
					<Button variant='outline' asChild className='w-2/3 h-[50px]'>
						<Link href={'/dashboard/log-activity/history'}>
							Activity History
						</Link>
					</Button>
					<CategoryGrid
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
				</div>
			</div>
		</ProtectedRoute>
	);
}

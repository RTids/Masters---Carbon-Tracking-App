'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import getConfirmedProfile from '@/lib/user/checkEmailConfirmed';

export default function CheckEmail() {
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		let pollingInterval;
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) return;

			const profile = await getConfirmedProfile(user.id);

			if (profile?.email_confirmed_at) {
				clearInterval(pollingInterval);
				router.push('/dashboard');
			}
		};

		checkUser();

		pollingInterval = setInterval(checkUser, 5000);

		return () => {
			clearInterval(pollingInterval);
		};
	}, [router, supabase]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center p-4'>
			<h1 className='text-2xl font-bold'>Check your email 📩</h1>
			<p className='mt-2 text-lg'>
				Please confirm your email address before accessing the dashboard.
			</p>
		</div>
	);
}

'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import signOut from '../lib/user/signout';

//Import our components
import WelcomeMessage from '../components/welcomeMessage';
import Loading from '../components/loading';
import { useRouter } from 'next/navigation';

export default function Dashboard({ user }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [firstName, setFirstname] = useState(null);
	const router = useRouter();

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);

			const { data, error } = await supabase.auth.getUser();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				console.log(data.user.id);

				const { data: profileData, error: profileError } = await supabase
					.from('profiles')
					.select('first_name')
					.eq('id', data.user.id)
					.single();

				setFirstname(profileData.first_name);
			} 
		} catch (error) {
			alert('Error loading user data!');
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getProfile();
	}, [user, getProfile]);

	const handleSignOut = async () => {
		try {
		  await signOut();
		  router.push('/'); // redirect to homepage after sign out
		} catch (error) {
		  alert('Failed to sign out');
		}
	  };

	return (
		<div>
			{loading && <Loading />}
			{!loading && firstName && <WelcomeMessage name={firstName} />}
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
}

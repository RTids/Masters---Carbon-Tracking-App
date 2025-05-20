'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Dashboard({ user }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [firstName, setFirstname] = useState(null);

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`first_name`)
				.eq('id', user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFirstname(data.first_name);
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

	return (
		<div>
			<pre>{data}</pre>
		</div>
	);
}

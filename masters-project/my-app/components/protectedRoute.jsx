'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ProtectedRoute({ children }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const supabase = createClient();
			const { data, error } = await supabase.auth.getUser();

			if (error || !data?.user) {
				router.replace('/'); // redirect if not authenticated
			} else {
				setLoading(false);
			}
		};

		checkAuth();
	}, [router]);

	if (loading) return <div>Loading...</div>;
	return <div className='w-screen h-screen'>{children}</div>;
}

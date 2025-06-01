'use client';

import signOut from '@/lib/user/signout';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignOutButton() {
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			toast.success('Signed Out!');
			router.push('/'); // redirect to homepage after sign out
		} catch (error) {
			toast.error('Failed to Sign Out.');
		}
	};

	return (
		<Button variant='destructive' onClick={handleSignOut}>
			Signout
		</Button>
	);
}

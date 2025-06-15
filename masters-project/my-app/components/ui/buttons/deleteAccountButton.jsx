'use client';

import deleteAccount from '@/lib/user/deleteProfile';
import { Button } from '@/components/ui/buttons/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AccountDeleteButton() {
	const router = useRouter();

	const handleAccountDelete = async () => {
		try {
			await deleteAccount();
			toast.success('Account Deleted');
			router.push('/'); // redirect to homepage after sign out
		} catch (error) {
			toast.error(`Failed to delete account: ${error}`);
		}
	};

	return (
		<Button variant='destructive' onClick={handleAccountDelete}>
			Delete Account
		</Button>
	);
}

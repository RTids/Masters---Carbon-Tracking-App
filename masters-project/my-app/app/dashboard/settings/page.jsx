'use client';

import ProtectedRoute from '@/components/protectedRoute';
import NavBar from '@/components/ui/navBar';
import SignOutButton from '@/components/ui/signOutButton';
import UpdateProfile from '@/components/ui/updateProfile';
import { toast } from 'sonner';

export default function Settings() {
	return (
		<ProtectedRoute>
			<NavBar onDashboard={false} />
			<h1>Settings</h1>
			<UpdateProfile
				onSuccess={() => toast.success('Update Profile.')}
				onError={(err) => toast.error(err)}
			/>
			<SignOutButton />
		</ProtectedRoute>
	);
}

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
			<div className='h-2/3 flex flex-col items-center justify-between pt-30'>
				<h1 className='text-2xl'>Settings</h1>
				<UpdateProfile
					onSuccess={() => toast.success('Update Profile.')}
					onError={(err) => toast.error(err)}
				/>
				<SignOutButton />
			</div>
		</ProtectedRoute>
	);
}

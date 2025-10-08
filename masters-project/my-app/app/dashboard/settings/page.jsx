'use client';

//External Components/Modules
import { toast } from 'sonner';

//Internal Components
import ProtectedRoute from '@/components/protectedRoute';
import NavBar from '@/components/ui/navBar';
import SignOutButton from '@/components/ui/buttons/signOutButton';
import UpdateProfile from '@/components/ui/updateProfile';
import AccountDeleteButton from '@/components/ui/buttons/deleteAccountButton';

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
				<AccountDeleteButton />
			</div>
		</ProtectedRoute>
	);
}

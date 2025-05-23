import signOut from '../app/lib/user/signout';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			router.push('/'); // redirect to homepage after sign out
		} catch (error) {
			alert('Failed to sign out');
		}
	};

	return <button onClick={handleSignOut}>Sign Out</button>;
}

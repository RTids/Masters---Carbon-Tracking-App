'use client';

//External Libraries/Modules
import { login } from '../../lib/user/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

//Internal Components
import { Button } from '@/components/ui/buttons/button';

export default function LoginPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const result = await login(formData);

		setLoading(false);

		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success('Log in successful');
			router.push('/dashboard');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center gap-2'
		>
			<label htmlFor='email' className='pr-2'>
				Email:
			</label>
			<input
				id='email'
				name='email'
				type='email'
				required
				className='border border-white mr-4'
			/>
			<label htmlFor='password' className='pr-2'>
				Password:
			</label>
			<input
				id='password'
				name='password'
				type='password'
				required
				className='border border-white mr-4'
			/>
			<Button type='submit' disabled={loading}>
				{loading ? 'Logging in...' : 'Log in'}
			</Button>
		</form>
	);
}

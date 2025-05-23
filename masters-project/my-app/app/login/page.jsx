'use client';

import { login } from '../../lib/user/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

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
		<form onSubmit={handleSubmit}>
			<label htmlFor='email'>Email:</label>
			<input id='email' name='email' type='email' required />
			<label htmlFor='password'>Password:</label>
			<input id='password' name='password' type='password' required />
			<button type='submit' disabled={loading}>
				{loading ? 'Logging in...' : 'Log in'}
			</button>
		</form>
	);
}

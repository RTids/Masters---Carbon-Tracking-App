'use client';

import { signup } from '../../lib/user/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

export default function SignUpPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const result = await signup(formData);

		setLoading(false);

		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success('Success! Please confirm account via your email.');
			router.push('/check-email');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='email'>Email:</label>
			<input id='email' name='email' type='email' required />
			<label htmlFor='password'>Password:</label>
			<input id='password' name='password' type='password' required />
			<label htmlFor='first_name'>First Name:</label>
			<input id='first_name' name='first_name' type='text' required />
			<label htmlFor='last_name'>Last Name:</label>
			<input id='last_name' name='last_name' type='text' required />
			<button type='submit' disabled={loading}>
				{loading ? 'Creating Account' : 'Sign Up'}
			</button>
		</form>
	);
}

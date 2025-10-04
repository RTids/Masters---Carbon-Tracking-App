'use client';

import { signup } from '../../lib/user/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/buttons/button';

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
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center gap-2'
		>
			<div className='flex flex-row justify-center items-center gap-4'>
				<label htmlFor='email' className='pr-2'>
					Email:
				</label>
				<input
					id='email'
					name='email'
					type='email'
					required
					className='border'
				/>
			</div>

			<div>
				<label htmlFor='password' className='pr-2'>
					Password:
				</label>
				<input
					id='password'
					name='password'
					type='password'
					required
					className='border'
				/>
			</div>

			<div>
				<label htmlFor='first_name' className='pr-2'>
					First Name:
				</label>
				<input
					id='first_name'
					name='first_name'
					type='text'
					required
					className='border'
				/>
			</div>
			<div>
				<label htmlFor='last_name' className='pr-2'>
					Last Name:
				</label>
				<input
					id='last_name'
					name='last_name'
					type='text'
					required
					className='border'
				/>
			</div>

			<Button type='submit' disabled={loading}>
				{loading ? 'Creating Account' : 'Sign Up'}
			</Button>
		</form>
	);
}

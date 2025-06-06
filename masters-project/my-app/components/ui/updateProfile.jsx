'use client';

import { useEffect, useState } from 'react';
import updateProfile from '@/lib/user/updateProfile';
import getProfileData from '@/lib/user/getProfile';
import { Button } from './button';

export default function UpdateProfile({ onSuccess, onError }) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [loading, setLoading] = useState(false);

	const getCurrentProfileData = async () => {
		const profileData = await getProfileData();
		setFirstName(profileData.first_name);
		setLastName(profileData.last_name);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const result = await updateProfile(firstName, lastName);

		setLoading(false);

		if (result?.error) {
			onError(result.error);
		} else {
			onSuccess();
		}
	};

	useEffect(() => {
		getCurrentProfileData();
	}, []);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='first_name'>First Name:</label>
				<input
					id='first_name'
					placeholder={firstName}
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				></input>
				<label htmlFor='last_name'>Last Name:</label>
				<input
					id='last_name'
					placeholder={lastName}
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				></input>
				<Button type='submit' disabled={loading}>
					Update
				</Button>
			</form>
		</div>
	);
}

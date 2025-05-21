'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
	const router = useRouter();

	const goToLogin = () => {
		router.push('/login');
	};

	const goToSignUp = () => {
		router.push('/sign-up');
	};

	return (
		<div className={styles.page}>
			<p>Log in and Sign Up page</p>
			<button onClick={goToLogin}>Log In</button>
			<button onClick={goToSignUp}>Sign Up</button>
		</div>
	);
}

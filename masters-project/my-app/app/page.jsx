'use client';

import { Button } from '@/components/ui/buttons/button';
import NavBar from '@/components/ui/navBar';
import styles from './page.module.css';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/buttons/darkModeToggleButton';

export default function Home() {
	return (
		<div className={styles.page}>
			<NavBar onDashboard={true} />
			<div className='mt-100 flex gap-10 justify-center items-center'>
				<Button asChild>
					<Link href='/login'>Log In</Link>
				</Button>
				<Button asChild>
					<Link href='/sign-up'>Sign Up</Link>
				</Button>
			</div>
		</div>
	);
}

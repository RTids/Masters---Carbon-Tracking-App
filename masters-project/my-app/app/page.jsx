'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/darkModeToggleButton';

export default function Home() {
	return (
		<div className={styles.page}>
			<p>Log in and Sign Up page</p>
			<ModeToggle />
			<Button asChild>
				<Link href='/login'>Log In</Link>
			</Button>
			<Button asChild>
				<Link href='/sign-up'>Sign Up</Link>
			</Button>
		</div>
	);
}

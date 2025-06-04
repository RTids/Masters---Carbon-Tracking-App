'use client';

import { ModeToggle } from './darkModeToggleButton';
import Logo from '@/lib/ui/logo';
import { useRouter } from 'next/navigation';
import { Router } from 'lucide-react';
import { Button } from './button';

export default function NavBar({ onDashboard }) {
	const router = useRouter();
	return (
		<nav className='w-full flex items-center mb-4 pt-3 pb-3 fixed top-0 justify-center bg-background text-center'>
			<ul className='flex flex-row justify-around w-full items-center text-center'>
				<li className={onDashboard ? 'invisible' : 'visible'}>
					<Button
						variant='outline'
						className='cursor-pointer'
						onClick={() => !onDashboard && router.back()}
					>
						Back
					</Button>
				</li>
				<li>
					<Logo />
				</li>
				<li>
					<ModeToggle />
				</li>
			</ul>
		</nav>
	);
}

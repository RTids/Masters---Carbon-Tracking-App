import { ModeToggle } from './darkModeToggleButton';
import Logo from '@/lib/ui/logo';

export default function NavBar({ onDashboard }) {
	return (
		<nav className='w-full flex items-center mb-4 fixed top-20'>
			<ul className='flex flex-row justify-around w-full items-center text-center'>
				<li className={onDashboard ? 'invisible' : 'visible'}>Back</li>
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

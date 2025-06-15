import { Button } from './buttons/button';
import Link from 'next/link';

export default function CategoryGrid() {
	return (
		<div className='grid grid-cols-2 grid-rows-2 gap-2'>
			<Button
				asChild
				variant='outline'
				className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'
			>
				<Link href='/dashboard/log-activity/food-drink'>Food/Drink</Link>
			</Button>
			<Button
				asChild
				variant='outline'
				className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'
			>
				<Link href='/dashboard/log-activity/travel'>Travel</Link>
			</Button>
			<Button
				asChild
				variant='outline'
				className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'
			>
				<Link href='/dashboard/log-activity/energy-home'>Energy/Home</Link>
			</Button>
			<Button
				asChild
				variant='outline'
				className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'
			>
				<Link href='/dashboard/log-activity/lifestyle'>Lifestyle</Link>
			</Button>
		</div>
	);
}

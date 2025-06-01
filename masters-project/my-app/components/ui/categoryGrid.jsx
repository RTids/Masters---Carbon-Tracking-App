export default function CategoryGrid() {
	return (
		<div className='grid grid-cols-2 grid-rows-2 gap-2'>
			<div className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'>
				Food/Drink
			</div>
			<div className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'>
				Travel
			</div>
			<div className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'>
				Energy/Home
			</div>
			<div className='bg-white dark:bg-gray-800 border rounded h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center cursor-pointer'>
				Lifestyle
			</div>
		</div>
	);
}

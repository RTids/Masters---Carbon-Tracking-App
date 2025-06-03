import displayPinnedList from '@/lib/carbon/displayPinnedActivities';
import { useEffect, useState } from 'react';
import Modal from './modal';
import PinActivityButton from './pinActivityButton';
import LogActivityForm from './logActivityForm';
import { toast } from 'sonner';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './carousel';
import { Card, CardContent, CardTitle } from './card';
import { activityIcons } from '@/lib/ui/icons';

export default function QuickAccessList({ isModalOpen, setIsModalOpen }) {
	const [pinnedActivities, setPinnedActivities] = useState(null);
	const [selectedActivity, setSelectedActivity] = useState(null);
	//Carousel states
	const [api, setApi] = useState(null);
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const goToSlide = (index) => {
		if (api) {
			api.scrollTo(index);
		}
	};

	const loadPinnedList = async () => {
		const list = await displayPinnedList();
		setPinnedActivities(list);
	};

	useEffect(() => {
		if (api && pinnedActivities) {
			// Give time for carousel DOM to reflect changes
			requestAnimationFrame(() => {
				setCount(api.scrollSnapList().length);
			});
		}
	}, [pinnedActivities, api]);

	useEffect(() => {
		loadPinnedList();
	}, []);

	//When clicking an activity in the search list, open modal and set selected activity
	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
	};

	return (
		<div className='items-center flex flex-col max-w-100 justify-center'>
			<h3 className='mb-2'>Quick Access Activities</h3>
			{!pinnedActivities || pinnedActivities.length === 0 ? (
				<div className='w-100 md:w-max sm:max-w-2xl lg:max-w-4xl h-[212px] flex justify-center items-center'>
					No Activities Added to Quick Access
				</div>
			) : (
				<Carousel
					className='w-full md:w-max sm:max-w-2xl lg:max-w-4xl '
					setApi={setApi}
				>
					<CarouselContent className='-m1-5'>
						{pinnedActivities.map((activity) => {
							return (
								<CarouselItem
									key={activity.id}
									onClick={() => handleSelect(activity)}
									className='basis-1/ p1-5'
								>
									<Card className='size-35 text-center text-sm w-full max-w-[140px] min-w-[140px] cursor-pointer'>
										<CardContent className='flex flex-col items-center w-full'>
											{activityIcons[activity.icon]}
											<CardTitle className='text-xs mt-4 w-[140px]'>
												{activity.name}
											</CardTitle>
										</CardContent>
									</Card>
								</CarouselItem>
							);
						})}
					</CarouselContent>
					<CarouselNext className='hidden sm:flex cursor-pointer' />
					<CarouselPrevious className='hidden sm:flex cursor-pointer' />
					{/* Dots below carousel */}
					<div className='flex justify-center space-x-2 mt-4 mb-4'>
						{Array.from({ length: count }).map((_, index) => (
							<button
								key={index}
								className={`h-2 w-2 rounded-full transition-colors ${
									current === index + 1 ? 'bg-blue-600' : 'bg-gray-300'
								}`}
								onClick={() => goToSlide(index)}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</Carousel>
			)}

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<PinActivityButton
					activity={selectedActivity}
					onSuccess={(successMessage) => {
						toast.success(successMessage);
						loadPinnedList();
					}}
					onError={(err) => toast.error(err)}
				/>
				<LogActivityForm
					activity={selectedActivity}
					onSuccess={() => {
						setIsModalOpen(false);
						toast.success('Successfully logged activity!');
					}}
					onError={(err) => toast.error(err)}
				/>
			</Modal>
		</div>
	);
}

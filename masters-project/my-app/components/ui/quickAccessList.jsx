import displayPinnedList from '@/lib/carbon/displayPinnedActivities';
import { useEffect, useState } from 'react';
import Modal from './modal';
import PinActivityButton from './pinActivityButton';
import LogActivityForm from './logActivityForm';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem } from './carousel';
import { Card, CardContent, CardTitle } from './card';
import { activityIcons } from '@/lib/ui/icons';

export default function QuickAccessList() {
	const [pinnedActivities, setPinnedActivities] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
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
		loadPinnedList();
	}, []);

	//When clicking an activity in the search list, open modal and set selected activity
	const handleSelect = (activity) => {
		setSelectedActivity(activity);
		setIsModalOpen(true);
	};

	return (
		<div className='items-center flex flex-col'>
			<h3>Quick Access Activities</h3>
			{!pinnedActivities ? (
				<div>Loading...</div>
			) : (
				<Carousel className='w-90' setApi={setApi}>
					<CarouselContent className='-m1-5'>
						{pinnedActivities.map((activity) => {
							return (
								<CarouselItem
									key={activity.id}
									onClick={() => handleSelect(activity)}
									className='basis-1/ p1-5'
								>
									<Card className='size-35'>
										<CardContent className='flex flex-col items-center'>
											{activityIcons[activity.icon]}
											<CardTitle className=''>{activity.name}</CardTitle>
										</CardContent>
									</Card>
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</Carousel>
			)}
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

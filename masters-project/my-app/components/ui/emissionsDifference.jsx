import { Card, CardContent, CardTitle } from './card';

export default function EmissionsDifference() {
	return (
		<div className='flex flex-col justify-center items-center gap-3 border-b-7 w-2/3 pb-3'>
			<div className='flex flex-row justify-center items-center gap-5'>
				<Card className='p-5 border-solid sm:h-[100px] sm:w-[300px] flex flex-col items-center w-2/3'>
					<CardTitle>Yesterday</CardTitle>
				</Card>
				<Card className='p-5 border-solid sm:h-[100px] sm:w-[300px] flex flex-col items-center w-2/3'>
					<CardTitle>Previous Week</CardTitle>
				</Card>
			</div>
		</div>
	);
}

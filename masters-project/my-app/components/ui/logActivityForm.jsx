'use client';

import { useState } from 'react';
import logActivity from '@/lib/carbon/logActivity';
import { Button } from './buttons/button';
import { formatUnits } from '@/utils/formatting';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/shadcn/popover';
import { Calendar } from '@/components/ui/shadcn/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function LogActivityForm({ activity, onSuccess, onError }) {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const result = await logActivity(amount, activity, date);

		setLoading(false);

		if (result?.error) {
			onError(result.error);
		} else {
			onSuccess();
		}
	};

	const calculatedEmissions = (activity.emissions_per_unit * amount).toFixed(2);

	return (
		<div className='text-center'>
			<h2 className='text-4xl font-bold pb-3 pt-5'>{activity.name}</h2>
			<h4 className='pb-3'>
				{calculatedEmissions} <span className='font-thin text-sm'>kgCO₂e</span>
			</h4>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col justify-center items-center text-center gap-5'
			>
				<div className='pb-3'>
					<input
						className='w-1/5 pr-2'
						id='amount'
						name='amount'
						type='number'
						min='0'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
					<label htmlFor='amount' className='text-sm font-thin'>
						{formatUnits(activity.unit)}
					</label>
				</div>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							data-empty={!date}
							className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal'
						>
							<CalendarIcon />
							{date ? format(date, 'PPP') : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar
							mode='single'
							selected={date}
							onSelect={(date) => {
								setDate(date.toISOString());
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>

				<Button type='submit' disabled={loading} variant='outline'>
					{loading ? 'Logging...' : 'Log Activity'}
				</Button>
			</form>
		</div>
	);
}

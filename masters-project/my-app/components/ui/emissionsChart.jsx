'use client';

//External Libraries / Modules
import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '@/components/ui/shadcn/dropdown-menu';
import { useTheme } from 'next-themes';

//Internal Components
import DrawLineChart from '../charts/lineChart';
import { Button } from './buttons/button';

//Custom Hooks / Functions
import { capitalize } from '@/utils/formatting';
import DrawPieChart from '../charts/pieChart';

export default function EmissionsChart() {
	const [position, setPosition] = useState('week');

	const { theme, resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	const toolTipColour = isDark ? '#1a202c' : '#ffffff';
	const textColour = isDark ? '#ffffff' : '#1a202c';

	return (
		<div className='max-w-2/3 flex flex-col items-center'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>{capitalize(position)}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-50 z-300'>
					<DropdownMenuLabel>Select Time Frame</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value='week'>Week</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='month'>Month</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='year'>Year</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<div className='sm:flex sm:flex-row justify-center items-center pt-4 pb-4 text-center w-full max-h-300'>
				<div>
					<h4>Emissions History</h4>
					<DrawLineChart timeframe={position} />
				</div>

				<div>
					<h4>Category Breakdown</h4>
					<DrawPieChart timeframe={position} />
				</div>
			</div>
		</div>
	);
}

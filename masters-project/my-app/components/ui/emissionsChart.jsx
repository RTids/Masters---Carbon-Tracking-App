'use client';

//External Libraries / Modules
import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '@radix-ui/react-dropdown-menu';

//Internal Components
import DrawLineChart from '../charts/lineChart';
import { Button } from './buttons/button';

//Custom Hooks / Functions
import { capitalize } from '@/utils/formatting';

export default function EmissionsChart() {
	const [position, setPosition] = useState('week');
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>{capitalize(position)}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-40 bg-[#0f172b] z-500'>
					<DropdownMenuLabel>Select Time Frame</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value='week'>Week</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='month'>Month</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value='year'>Year</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DrawLineChart timeframe={position} />
		</div>
	);
}

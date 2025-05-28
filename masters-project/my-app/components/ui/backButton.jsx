import { Button } from './button';
import Link from 'next/link';

export default function BackButton({ location }) {
	return (
		<Button asChild>
			<Link href={location}>Back</Link>
		</Button>
	);
}

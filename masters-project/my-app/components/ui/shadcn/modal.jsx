import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Button } from '../buttons/button';
import { Card } from './card';

export default function Modal({ isOpen, onClose, children }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!isOpen || !mounted) return null;

	return createPortal(
		<div>
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0,0,0,0.5)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 100,
					color: 'black',
				}}
				onClick={onClose} // close modal if background clicked
			>
				<Card
					className='p-15 min-w-[300px] flex flex-col relative justify-center items-center'
					style={{
						borderRadius: 8,
					}}
					onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside box
				>
					<Button
						onClick={onClose}
						variant='destructive'
						className='absolute top-4 right-4'
					>
						Close
					</Button>
					{children}
				</Card>
			</div>
		</div>,
		document.body
	);
}

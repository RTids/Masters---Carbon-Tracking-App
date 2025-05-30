import LogActivityForm from './logActivityForm';

export default function Modal({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
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
					zIndex: 1000,
					color: 'black',
				}}
				onClick={onClose} // close modal if background clicked
			>
				<div
					style={{
						backgroundColor: 'white',
						padding: 20,
						borderRadius: 8,
						minWidth: '300px',
					}}
					onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside box
				>
					<button onClick={onClose} style={{ float: 'right' }}>
						Close
					</button>
					{children}
				</div>
			</div>
		</div>
	);
}

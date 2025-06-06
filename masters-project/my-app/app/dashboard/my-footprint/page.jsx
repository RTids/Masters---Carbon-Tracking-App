import NavBar from '@/components/ui/navBar';
import ProtectedRoute from '@/components/protectedRoute';

export default function MyFootprint() {
	return (
		<ProtectedRoute>
			<NavBar onDashboard={false} />
			<h1>My Footprint</h1>
		</ProtectedRoute>
	);
}

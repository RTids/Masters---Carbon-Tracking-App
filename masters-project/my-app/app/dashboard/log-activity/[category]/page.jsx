'use client';

import ProtectedRoute from '@/components/protectedRoute';
import NavBar from '@/components/ui/navBar';

export default async function History({ params }) {
	const { category } = await params;
	return (
		<ProtectedRoute>
			<NavBar onDashboard={false} />
			<h3>{category}</h3>
		</ProtectedRoute>
	);
}

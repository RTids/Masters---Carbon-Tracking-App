//Internal Components
import NavBar from '@/components/ui/navBar';
import ProtectedRoute from '@/components/protectedRoute';
import DailyEmissions from '@/components/ui/dailyEmissions';
import EmissionsDifference from '@/components/ui/emissionsDifference';
import EmissionsChart from '@/components/ui/emissionsChart';

export default function MyFootprint() {
	return (
		<ProtectedRoute>
			<NavBar onDashboard={false} />
			<div className='flex flex-col justify-center items-center gap-4'>
				<h1 className='pt-25 text-xl font-bold'>My Footprint</h1>
				<DailyEmissions />
				<EmissionsDifference />
				<EmissionsChart />
			</div>
		</ProtectedRoute>
	);
}

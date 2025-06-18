//Internal Components
import NavBar from '@/components/ui/navBar';
import ProtectedRoute from '@/components/protectedRoute';
import DailyEmissions from '@/components/ui/dailyEmissions';
import EmissionsDifference from '@/components/ui/emissionsDifference';
import DrawLineChart from '@/components/charts/lineChart';

export default function MyFootprint() {
	return (
		<ProtectedRoute>
			<NavBar onDashboard={false} />
			<div className='flex flex-col justify-center items-center gap-4'>
				<h1 className='pt-30 text-3xl font-bold'>My Footprint</h1>
				<DailyEmissions />
				<EmissionsDifference />
				<div>Category breakdown</div>
				<div>Chart showing emissions history for previous week</div>
				<DrawLineChart timeframe='weekly' />
			</div>
		</ProtectedRoute>
	);
}

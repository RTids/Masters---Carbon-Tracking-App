//Custom Hooks / Functions
import getDailyTotal from './getDailyTotal';
import getPreviousSixDays from './getPreviousSixDays';

export default async function getCurrentWeekTotal() {
	const today = await getDailyTotal();
	const todayTotal = today.total;
	const previousSixDays = await getPreviousSixDays();
	const previousSixDaysTotal = previousSixDays.reduce((total, current) => {
		return total + current.total;
	}, 0);

	const weeklyTotal = todayTotal + previousSixDaysTotal;

	return weeklyTotal;
}

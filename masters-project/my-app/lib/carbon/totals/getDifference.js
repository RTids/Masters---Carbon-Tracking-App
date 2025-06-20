//Custom Hooks / Functions
import getCurrentWeekTotal from './getCurrentWeekTotal';
import getDailyTotal from './getDailyTotal';
import getPreviousWeekTotal from './getPreviousWeekTotal';
import getYesterdayTotal from './getYesterdayTotal';

export function getDifference(input1, input2) {
	const result = input1 - input2;
	return result.toFixed(2);
}

export async function getYesterdayDifference() {
	const todayTotal = await getDailyTotal();
	const yesterdayTotal = await getYesterdayTotal();
	const result = todayTotal.total - yesterdayTotal;
	return result.toFixed(2);
}

export async function getWeekDifference() {
	const thisWeekTotal = await getCurrentWeekTotal();
	const previousWeekTotal = await getPreviousWeekTotal();
	const result = thisWeekTotal - previousWeekTotal;
	return result.toFixed(2);
}

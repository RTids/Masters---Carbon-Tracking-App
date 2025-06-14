import getDailyTotal from './getDailyTotal';
import getYesterdayTotal from './getYesterdayTotal';

export function getDifference(input1, input2) {
	const result = input1 - input2;
	return result.toFixed(2);
}

export async function getYesterdayDifference() {
	const todayTotal = await getDailyTotal();
	const yesterdayTotal = await getYesterdayTotal();
	const result = todayTotal - yesterdayTotal;
	return result.toFixed(2);
}

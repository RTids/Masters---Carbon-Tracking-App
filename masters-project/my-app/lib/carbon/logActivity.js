export default async function logActivity(amount, selectedActivity) {
	console.log(`Activity Logged: ${selectedActivity}`);
	console.log(`${amount} ${selectedActivity.unit}`);
}

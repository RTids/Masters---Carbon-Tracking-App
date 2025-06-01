export default async function History({ params }) {
	const { category } = await params;
	return (
		<div>
			<h3>{category}</h3>
		</div>
	);
}

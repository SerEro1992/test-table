export function getDateValues(client) {
	const startDate = new Date(client.dates[0].start_date);
	const endDate = new Date(client.dates[0].end_date);
	const today = new Date();

	return { startDate, endDate, today };
}

export function calculateDaysDifference(startDate, endDate, today) {
	const daysDifferenceBefore =
		startDate > today
			? Math.ceil((startDate - today) / (1000 * 60 * 60 * 24))
			: null;

	const daysDifferenceAfter =
		startDate <= today
			? Math.abs(Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)))
			: null;

	return { daysDifferenceBefore, daysDifferenceAfter };
}

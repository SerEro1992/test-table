
export const useUtils = () => {
	const getUniqueValue = (arr) => {
		return [...new Set(arr)];
	};

	const getUniqueDate = (arr) => {
		return [...new Set(arr.map((date) => JSON.stringify(date)))].map((date) =>
			JSON.parse(date)
		);
	};

	const formatDate = (dateString) => {
		const options = { month: 'short', day: 'numeric' };
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU', options);
	};

	const getDaysCount = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const timeDiff = Math.abs(end - start);
		const daysCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return daysCount;
	};



	return {
		getUniqueValue,
		getUniqueDate,
		formatDate,
		getDaysCount,
	};
};

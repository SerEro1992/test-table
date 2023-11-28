import { ref } from 'vue';
import { getDateValues, calculateDaysDifference } from '../helpers/date';

export const useSort = (clients) => {
	const sortDirection = ref('asc');

	const toggleSortDirection = () => {
		sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
	};

	const sortByOrderId = () => {
		toggleSortDirection();
		const sortedClients = [...clients.value];
		sortedClients.sort((a, b) =>
			sortDirection.value === 'asc' ? a.o_id - b.o_id : b.o_id - a.o_id
		);

		clients.value = sortedClients;
	};

	const sortByName = () => {
		toggleSortDirection();
		const sortedClients = [...clients.value];
		sortedClients.sort((a, b) =>
			sortDirection.value === 'asc'
				? a.client_name.localeCompare(b.client_name)
				: b.client_name.localeCompare(a.client_name)
		);
		clients.value = sortedClients;
	};

	const sortByPayment = () => {
		toggleSortDirection();

		const sortedClients = [...clients.value];

		sortedClients.sort((a, b) => {
			if (a.pay_status !== b.pay_status) {
				return sortDirection.value === 'asc'
					? a.pay_status.localeCompare(b.pay_status)
					: b.pay_status.localeCompare(a.pay_status);
			} else {
				return sortDirection.value === 'asc'
					? b.order_sum - b.order_payed - (a.order_sum - a.order_payed)
					: a.order_sum - a.order_payed - (b.order_sum - b.order_payed);
			}
		});

		clients.value = sortedClients;
	};

	const sortByStatus = () => {
		const sortedClients = [...clients.value];
		sortedClients.sort((a, b) => {
			const {
				startDate: startDateA,
				endDate: endDateA,
				today: todayA,
			} = getDateValues(a);
			const {
				startDate: startDateB,
				endDate: endDateB,
				today: todayB,
			} = getDateValues(b);

			const {
				daysDifferenceBefore: diffBeforeA,
				daysDifferenceAfter: diffAfterA,
			} = calculateDaysDifference(startDateA, endDateA, todayA);
			const {
				daysDifferenceBefore: diffBeforeB,
				daysDifferenceAfter: diffAfterB,
			} = calculateDaysDifference(startDateB, endDateB, todayB);

			if (a.status.sort === b.status.sort) {
				if (diffAfterA !== diffAfterB) {
					return diffAfterA - diffAfterB;
				}

				return diffBeforeB - diffBeforeA;
			}

			return a.status.sort - b.status.sort;
		});
		clients.value = sortedClients;
	};

	return {
		sortByStatus,
		sortByOrderId,
		sortByName,
		sortByPayment,
		sortByStatus,
	};
};

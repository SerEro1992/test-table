<script setup>
import data from './data/data.json';
import Client from './components/Client.vue';
import Head from './components/Head.vue';
import { ref } from 'vue';
import { useSort } from './composables/useSort';
import { getDateValues, calculateDaysDifference } from './helpers/date';
import { sortStatus } from './data/SortStatus'


const clients = ref(
	data.map((client) => {
		const { startDate, endDate, today } = getDateValues(client);

		let status = '';
		const { daysDifferenceBefore, daysDifferenceAfter } =
			calculateDaysDifference(startDate, endDate, today);

		if (daysDifferenceBefore) {
			status = sortStatus.notStart;
		} else if (startDate < today && endDate > today) {
			status = sortStatus.notEnd;
		} else if (startDate < today && daysDifferenceAfter === 1) {
			status = sortStatus.endTomorrow;
		} else if (startDate < today && daysDifferenceAfter === 0) {
			status = sortStatus.endToday;
		} else if (startDate < today && endDate < today) {
			status = sortStatus.endDaysAgo;
		}
		return { ...client, status };
	})
);

const { sortByOrderId, sortByName, sortByPayment, sortByStatus } =
	useSort(clients);

const handleColumnClick = (subtitle) => {
	if (subtitle === 'id') {
		sortByOrderId();
	} else if (subtitle === 'Имя') {
		sortByName();
	} else if (subtitle === 'Оплата заказа') {
		sortByPayment();
	} else if (subtitle === 'Статус') {
		sortByStatus();
	}
};
</script>

<template>
	<div>
		<table class="table">
			<thead>
				<Head @column-click="handleColumnClick" />
			</thead>

			<tbody>
				<Client
					v-for="client in clients"
					:key="client.o_id"
					:client="client"
					:handleColumnClick="handleColumnClick"
				/>
			</tbody>
		</table>
	</div>
</template>

<style>
.table {
	width: 100%;
	text-align: center;
	margin: 0 auto;
	border-collapse: collapse;
}
.table th {
	font-weight: bold;
	padding: 5px;
	background: #efefef;
	border: 1px solid gray;
}
.table td {
	border: 1px solid gray;
	padding: 5px;
}
</style>

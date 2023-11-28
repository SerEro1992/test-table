<template>
	<tr>
		<td>
			<span style="width: 50px">{{ client.o_id }}</span>
		</td>
		<td>
			<span style="width: 100px">{{ client.client_name }}</span>
		</td>
		<td>
			<span
				v-for="diet in getUniqueValue(props.client.diets)"
				:key="diet"
				class="emphasis"
				style="width: 80px"
				>{{ diet }}
			</span>
		</td>
		<td>
			<span
				v-for="tariff in getUniqueValue(props.client.tariff)"
				:key="tariff"
				class="emphasis"
				style="width: 100px"
				>{{ tariff }}
			</span>
		</td>
		<td>
			<span style="width: 140px">{{ client.address }}</span>
		</td>
		<td>
			<span style="width: 140px">{{ client.phone }}</span>
		</td>
		<td>
			<span
				v-for="date in getUniqueDate(props.client.dates)"
				:key="date.start_date"
				style="width: 120px"
			>
				{{ formatDate(date.start_date) }} - {{ formatDate(date.end_date) }} ({{
					getDaysCount(date.start_date, date.end_date)
				}})
			</span>
		</td>
		<td>
			<span style="width: 50px">{{ client.discount }} %</span>
		</td>
		<td
			:class="{
				debt: client.order_sum > client.order_payed,
				payment: client.order_sum <= client.order_payed,
			}"
		>
			<span class="order-status" style="width: 150px"
				>Стоим.: {{ client.order_sum.toFixed(1) }} р.</span
			>
			<span class="order-status">{{ client.pay_status }} </span>

			<span class="order-status">
				<span
					style="display: inline-block"
					v-if="client.order_sum > client.order_payed"
					>Долг:</span
				>
				<span style="display: inline-block" v-else>Переплата:</span>
				{{ Math.abs((client.order_sum - client.order_payed).toFixed(1)) }} р.
			</span>
		</td>
		<td>
			<span style="width: 150px">{{ client.courier_comment }}</span>
		</td>
		<td>
			<span style="width: 150px">{{ client.inner_comment }}</span>
		</td>
		<td>
			<span v-if="startDate > today">
				Начинается через {{ daysDifferenceBefore }} д.
			</span>
			<span v-else-if="startDate < today && endDate > today">
				Заканчивается через {{ daysDifferenceAfter }} д.
			</span>
			<span v-else-if="startDate < today && daysDifferenceAfter === 1">
				Заканчивается завтра
			</span>
			<span v-else-if="startDate < today && daysDifferenceAfter === 0">
				Заканчивается сегодня
			</span>
			<span v-else-if="startDate < today && endDate < today">
				Завершилось {{ daysDifferenceAfter }} д. назад
			</span>
		</td>
	</tr>
</template>

<script setup>
import { defineProps } from 'vue';
import { useUtils } from '../composables/useUtils';
import { getDateValues, calculateDaysDifference } from '../helpers/date';

const props = defineProps(['client']);
const { startDate, endDate, today } = getDateValues(props.client);
const { daysDifferenceBefore, daysDifferenceAfter } = calculateDaysDifference(
	startDate,
	endDate,
	today
);
const { getUniqueValue, getUniqueDate, formatDate, getDaysCount } = useUtils(
	props.client
);
</script>

<style scoped>
.emphasis {
	text-align: center;
	margin: 10px;
	padding-bottom: 10px;
	border-bottom: 2px dashed black;
}
.emphasis:last-child {
	border-bottom: none;
	padding-bottom: 0;
}
span {
	display: block;
}
.debt {
	background-color: lightcoral;
}

.payment {
	background-color: lightgreen;
}
</style>

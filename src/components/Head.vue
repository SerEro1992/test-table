<template>
	<tr>
		<th
			v-for="subtitle in tableHead"
			:key="subtitle"
			@click="handleSort(subtitle)"
		>
			{{ subtitle }}

			<img
				v-if="shouldShowImage(subtitle)"
				class="img"
				src="/1.png"
				alt="Сортировка"
			/>
		</th>
	</tr>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { tableHead } from '../data/TableHead';

const emits = defineEmits();
const props = defineProps(['title']);

const shouldShowImage = (subtitle) => {
	const columnsWithImage = ['id', 'Имя', 'Оплата заказа', 'Статус'];
	return columnsWithImage.includes(subtitle);
};

const handleSort = (subtitle) => {
	emits('column-click', subtitle);
};
</script>

<style scoped>
.img {
	width: 15px;
	height: 15px;
	margin-left: 5px;
	cursor: pointer;
}
th {
	align-items: center;
}
</style>

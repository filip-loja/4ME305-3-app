<template>
	<fl-table class="fl-table-bottom">
		<ion-grid>
			<ion-row>
				<ion-col size="3" v-for="card in myCards" :key="card.id">
					<fl-card @click="giveCard(card)" :model="card" />
				</ion-col>
			</ion-row>
		</ion-grid>
	</fl-table>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Card } from '@/store/store'
import { useStore } from '@/store'
import { IonGrid, IonRow, IonCol } from '@ionic/vue'
import FlTable from '@/components/FlTable.vue'
import FlCard from '@/components/FlCard.vue'
export default defineComponent({
	name: 'FlTableBottom',
	components: { FlTable, FlCard, IonGrid, IonRow, IonCol },
	setup () {
		const store = useStore()
		const myCards = computed<Card[]>(() => store.getters['myCards'])
		const giveCard = (card: Card) => store.dispatch('giveCard', card)

		return {
			myCards,
			giveCard
		}
	}
})
</script>

<style scoped>

	.fl-table-bottom {
		min-height: calc(70vh - 100px);
	}

</style>

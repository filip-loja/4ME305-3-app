<template>
	<fl-table class="fl-table-bottom">
		<transition-group class="fl-card-table" name="fl-card-transition" tag="div">
			<div class="fl-card-wrapper list-complete-item" v-for="card in myCards" :key="card.id">
				<fl-card @click="giveCard(card)" :model="card" :key="`card${card.id}`" />
			</div>
		</transition-group>
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

	.fl-card-table {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		box-sizing: border-box;
		position: relative;
	}

	.fl-card-wrapper {
		display: block;
		box-sizing: border-box;
		width: 25%;
		padding: 5px;
		transition: all 0.3s ease;
	}

	.fl-card-transition-enter-from,
	.fl-card-transition-leave-to {
		opacity: 0;
		transform: translateY(30px);
		perspective: 1000px;
	}

	.fl-card-transition-leave-active {
		position: absolute;
	}

</style>

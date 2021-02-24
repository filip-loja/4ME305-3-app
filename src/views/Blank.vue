<template>
	<ion-page>
		<ion-content :fullscreen="true">

			<div v-if="gameActive">

				<ion-card>
					<ion-card-content>
						Current Players: {{ player.name }}
					</ion-card-content>
				</ion-card>

				<fl-deck-background>
					<ion-grid>
						<ion-row>
							<ion-col size="6">
								<ion-button @click="takeCard">Take Card ({{ stackLength }})</ion-button>
							</ion-col>
							<ion-col size="6">
								<fl-card :model="upperCard" />
							</ion-col>
						</ion-row>
					</ion-grid>
				</fl-deck-background>

				<div style="border-bottom: 2px solid black"></div>

				<ion-grid>
					<ion-row>
						<ion-col size="6" v-for="card in player.cards" :key="card.id">
							<fl-card @click="giveCard(card)" :model="card" />
						</ion-col>
					</ion-row>
				</ion-grid>

				<div>
					<ion-button :disabled="!canResetMove" @click="resetMove">Cancel</ion-button>
					<ion-button :disabled="!canFinishRound" @click="finishRound">Confirm</ion-button>
				</div>

			</div>
			<div v-else>
				<h2>Game has not been started yet</h2>
				<ion-button @click="startNewGame">Start Game</ion-button>
			</div>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { IonButton, IonCard, IonCardContent, IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue'
import {Card, Player} from '@/store/store'
import FlCard from '@/components/FlCard.vue'
import FlDeckBackground from '@/components/FlDeckBackground.vue'

export default defineComponent({
	name: 'Blank',
	components: { IonButton, IonCard, IonCardContent, IonPage, IonContent, IonGrid, IonRow, IonCol, FlCard, FlDeckBackground },
	setup () {
		const store = useStore()

		const val = computed(() => store.state.sample)
		const gameActive = computed<boolean>(() => store.state.gameActive)
		const player = computed<Player>(() => store.getters['currentPlayer'])
		const upperCard = computed<Card>(() => store.getters['upperCard'])
		const stackLength = computed<number>(() => store.state.cardStack.length)

		const canResetMove = computed<boolean>(() => store.getters['canResetMove'])
		const canFinishRound = computed<boolean>(() => store.getters['canFinishRound'])

		const startNewGame = () => {
			store.dispatch('init')
		}

		const takeCard = () => {
			store.dispatch('takeCard').catch(err => alert(err))
		}

		const giveCard = (card: Card) => {
			store.dispatch('giveCard', card).catch(err => alert(err))
		}

		const finishRound = () => {
			store.dispatch('finishRound').catch(err => alert(err))
		}

		const resetMove = () => {
			store.dispatch('resetMove').catch(err => alert(err))
		}

		return {
			val,
			gameActive,
			player,
			startNewGame,
			takeCard,
			finishRound,
			giveCard,
			resetMove,
			upperCard,
			stackLength,
			canResetMove,
			canFinishRound
		}
	}
})
</script>

<style scoped>

</style>

<template>
	<layout-main title="Game results">
		<template v-if="gameLoaded">
			<fl-player-list :players="players" with-score />
			<br>
			<div class="fl-result-row">
				<div>Total rounds</div>
				<div>{{ rounds }}</div>
			</div>
			<div class="fl-result-row">
				<div>Total time</div>
				<div>{{ time }}</div>
			</div>
		</template>
		<fl-buttons-bottom>
			<ion-button :disabled="!canPlayAgain" @click="playAgain">Play again</ion-button>
			<ion-button @click="exitGame">Exit</ion-button>
		</fl-buttons-bottom>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IonButton } from '@ionic/vue'
import { useStore } from '@/store'
import { GameReportScore } from '@/store/store'
import LayoutMain from '@/layouts/LayoutMain.vue'
import FlPlayerList from '@/components/FlPlayerList.vue'
import FlButtonsBottom from '@/components/FlButtonsBottom.vue'
export default defineComponent({
	name: 'PageGameResult',
	components: { LayoutMain, FlPlayerList, FlButtonsBottom, IonButton },
	setup () {
		const store = useStore()
		const gameLoaded = computed<boolean>(() => !!store.state.game && !!store.state.game.finished)
		const players = computed<GameReportScore[]>(() => store.getters['userScoreOrder'])
		const rounds = computed<number>(() => store.state.game.result.rounds)
		const time = computed<string>(() => store.getters['timePlayed'])
		const canPlayAgain = computed<boolean>(() => false) // TODO implementovat

		const exitGame = () => store.dispatch('resetState')
		const playAgain = () => {
			console.log('NOT IMPLEMENTED')
		}

		return {
			playAgain,
			exitGame,
			canPlayAgain,
			gameLoaded,
			players,
			rounds,
			time
		}
	}
})
</script>

<style scoped>

	.fl-result-row {
		display: flex;
		justify-content: space-between;
		max-width: 60%;
		padding: 10px 0;
		margin: 0 auto;
	}

</style>

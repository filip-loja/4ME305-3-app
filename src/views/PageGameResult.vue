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
			<ion-button @click="playAgain">Play again</ion-button>
			<ion-button @click="exitGame">Exit</ion-button>
		</fl-buttons-bottom>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IonButton } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import {Game, GameReportScore} from '@/store/store'
import LayoutMain from '@/layouts/LayoutMain.vue'
import FlPlayerList from '@/components/FlPlayerList.vue'
import FlButtonsBottom from '@/components/FlButtonsBottom.vue'
import {errorAlert} from '@/utils'
export default defineComponent({
	name: 'PageGameResult',
	components: { LayoutMain, FlPlayerList, FlButtonsBottom, IonButton },
	setup () {
		const store = useStore()
		const router = useRouter()

		const game = computed<Game>(() => store.state.game)
		const gameLoaded = computed<boolean>(() => !!game.value && !!game.value.finished)
		const players = computed<GameReportScore[]>(() => store.getters['userScoreOrder'])
		const rounds = computed<number>(() => game.value.result.rounds)
		const time = computed<string>(() => store.getters['timePlayed'])

		const exitGame = () => {
			router.push({ name: 'pageHome' }).catch(() => null)
			store.commit('RESET_STATE')
		}

		const reCreateGame = async (gameId: string) => {
			store.commit('RESET_STATE')
			const resp = await store.state.wsConnection.createGame(gameId)
			if (resp.success) {
				router.push({ name: 'pageWaitingRoom' }).catch(() => null)
			} else {
				errorAlert(resp.message)
				router.push({ name: 'pageHome' }).catch(() => null)
			}
		}

		const reJoinGame = async (gameId: string) => {
			store.commit('RESET_STATE')
			const err = await store.state.wsConnection.joinGame(gameId)
			if (!err) {
				router.push({ name: 'pageWaitingRoom' }).catch(() => null)
			} else {
				errorAlert(err === 'game_not_found' ? 'The creator of the game needs to reopen it first! Try again in a moment.' : err)
				router.push({ name: 'pageJoinGame', query: { id: gameId } }).catch(() => null)
			}
		}

		const playAgain = () => {
			if (game.value.creator) {
				reCreateGame(game.value.id)
			} else {
				reJoinGame(game.value.id)
			}
		}

		return {
			playAgain,
			exitGame,
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

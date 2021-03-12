<template>
	<div style="display: block; width: 100%; height: 50px;"></div>
	<ion-header class="fl-game-header">
		<div class="fl-game-header__inner">
			<div>
				<ion-button color="primary" @click="showPlayers">
					<ion-icon :icon="people" />
				</ion-button>
			</div>
			<div class="fl-game-header__name" :class="{'fl-my-turn': isMyTurn}">{{ currentPlayerName }}</div>
			<div>
				<ion-button color="danger" @click="exitGame">
					<ion-icon :icon="exit" />
				</ion-button>
			</div>
		</div>
	</ion-header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IonButton, IonHeader, IonIcon, alertController } from '@ionic/vue'
import { exit, people } from 'ionicons/icons'
import { useStore } from '@/store'
import { Game } from '@/store/store'
import { WsConnection } from '@/ws/WsConnection'
import { useRouter } from 'vue-router'
export default defineComponent({
	name: 'FlGamePanelTop',
	emits: ['show-players'],
	components: { IonButton, IonHeader, IonIcon },
	setup (props, { emit }) {
		const store = useStore()
		const router = useRouter()
		const currentPlayerName = computed<string>(() => store.getters['currentPlayerName'])
		const isMyTurn = computed<boolean>(() => store.getters['isMyTurn'])

		const game = computed<Game>(() => store.state.game)
		const ws = computed<WsConnection>(() => store.state.wsConnection)

		const exitGame = async () => {
			const message = game.value.creator ? 'Are you sure you want to cancel the game? This action will disconnect all players that have already joined in.' : 'Are you sure you want to leave this game?'

			const alert = await alertController
				.create({
					header: 'Please confirm!',
					message,
					backdropDismiss: false,
					buttons: [
						{
							text: 'No',
							role: 'cancel'
						},
						{
							text: 'Yes',
							handler: () => {
								ws.value.leaveGame()
								router.push({ name: 'pageHome' }).catch(() => null)
							}
						}
					]
				})
			return alert.present()
		}

		const showPlayers = () => emit('show-players')

		return {
			currentPlayerName,
			isMyTurn,
			exitGame,
			showPlayers,
			exit,
			people
		}
	}
})
</script>

<style scoped>

	.fl-game-header {
		position: fixed;
		top: 0;
	}

	.fl-game-header__inner {
		display: flex;
		width: 100%;
		height: 50px;
		background-color: white;
		justify-content: space-between;
	}

	.fl-game-header__inner ion-button {
		height: 100%;
		margin: 0;
		--border-radius: 0;
		--box-shadow: none;
	}

	.fl-game-header__name {
		align-items: center;
		justify-content: center;
		flex: 1;
		display: flex;
		font-size: 1.2em;
		font-weight: bold;
		background-color: var(--ion-color-primary);
		color: var(--ion-color-primary-contrast);
	}

	.fl-my-turn {
		background-color: var(--ion-color-success);
		color: var(--ion-color-success-contrast);
	}

</style>

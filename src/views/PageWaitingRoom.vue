<template>
	<layout-main title="Waiting room" v-if="game">
		<div class="fl-game-code">
			<div class="fl-game-code__id">{{ game.id }}</div>
			<div class="fl-game-code__title">Game code</div>
		</div>
		<img :src="game.qr" class="fl-qr" />
		<fl-player-list :players="game.players" />
		<fl-buttons-bottom>
			<template v-if="game.creator">
				<ion-button @click="leaveGame">Cancel game</ion-button>
				<ion-button :disabled="!canStart" @click="startGame">Start game</ion-button>
			</template>
			<template v-else>
				<ion-button @click="leaveGame">Leave game</ion-button>
			</template>
		</fl-buttons-bottom>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import LayoutMain from '@/layouts/LayoutMain.vue'
import { useStore } from '@/store'
import { Game } from '@/store/store'
import { IonButton } from '@ionic/vue'
import { WsConnection } from '@/ws/WsConnection'
import { errorAlert } from '@/utils'
import FlButtonsBottom from '@/components/FlButtonsBottom.vue'
import FlPlayerList from '@/components/FlPlayerList.vue'
export default defineComponent({
	name: 'PageWaitingRoom',
	components: { LayoutMain, FlPlayerList, FlButtonsBottom, IonButton },
	setup () {
		const store = useStore()
		const game = computed<Game>(() => store.state.game)
		const ws = computed<WsConnection>(() => store.state.wsConnection)

		const canStart = computed<boolean>(() => store.state.game.players.length > 1)

		const leaveGame = async () => {
			// TODO mozno popup aby potvrdili
			const error = await ws.value.leaveGame()
			if (error) {
				errorAlert(error, 'bottom')
			} else {
				store.dispatch('resetState')
			}
		}

		const startGame = () => {
			ws.value.startGame()
		}

		// TODO Call beforeRouteLeave guards in deactivated components.
		// odhlasit sa z hry ked idem prec zo stranky

		return {
			game,
			canStart,
			leaveGame,
			startGame
		}
	}
})
</script>

<style scoped>

	.fl-qr {
		display: block;
		width: 65%;
		margin: 0 auto;
	}

	.fl-game-code {
		display: block;
		width: 100%;
		text-align: center;
	}

	.fl-game-code__id {
		font-size: 28px;
		font-weight: bold;
		font-family: monospace;
		padding-bottom: 5px;
		color: var(--ion-color-success-shade);
	}

	.fl-game-code__title {
		color: var(--ion-color-medium-shade);
	}

</style>

<template>
	<layout-main title="Waiting room" v-if="game">
		<ion-card>
			<ion-card-content class="ion-text-center">
				{{ game.id }}
			</ion-card-content>
		</ion-card>
		<img :src="game.qr" class="fl-qr" />
		<ion-card>
			<ion-card-content>
				<ion-list>
					<ion-item v-for="(player, index) in game.players" :key="player.id">
						<ion-label>{{ index + 1 }} {{ player.name }}</ion-label>
					</ion-item>
				</ion-list>
			</ion-card-content>
		</ion-card>
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
import { IonButton, IonList, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/vue'
import { WsConnection } from '@/ws/WsConnection'
import { errorAlert, resetGame } from '@/utils'
import FlButtonsBottom from '@/components/FlButtonsBottom.vue'
export default defineComponent({
	name: 'PageWaitingRoom',
	components: { LayoutMain, IonButton, IonList, IonItem, IonLabel, IonCard, IonCardContent, FlButtonsBottom },
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
				resetGame()
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

</style>

<template>
	<layout-main title="Join a Game">
		<div class="fl-page-join-game">
			<ion-list>

				<ion-item class="ion-no-padding">
					<ion-label position="floating">Game ID</ion-label>
					<ion-input type="text" required v-model="gameId" />
				</ion-item>

				<br /><br />
				<ion-button class="fl-btn" @click="joinGame">Join</ion-button>

			</ion-list>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { IonButton, toastController, IonList, IonItem, IonLabel, IonInput } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { WsConnection } from '@/ws/WsConnection'
import { errorAlert } from '@/utils'
import LayoutMain from '@/layouts/LayoutMain.vue'
export default defineComponent({
	name: 'PageJoinGame',
	components: { LayoutMain, IonButton, IonList, IonItem, IonLabel, IonInput },
	setup () {
		const store = useStore()
		const router = useRouter()
		const gameId = ref<string>('')
		const ws = computed<WsConnection>(() => store.state.wsConnection)

		const joinGame = async () => {
			if (gameId.value.trim().length) {
				const error = await ws.value.joinGame(gameId.value)
				if (error) {
					errorAlert(error, 'bottom')
				} else {
					router.push({ name: 'pageWaitingRoom' }).catch(() => null)
				}
			}
		}

		return {
			gameId,
			joinGame
		}
	}
})
</script>

<style scoped>

	.fl-page-join-game .fl-btn {
		width: 80%;
		margin: 0 auto;
		display: block;
	}

</style>

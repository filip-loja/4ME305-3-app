<template>
	<layout-main title="Join a Game">
		<div class="fl-page-join-game">
			<ion-list>

				<ion-item class="ion-no-padding">
					<ion-label position="floating">Game ID</ion-label>
					<ion-input type="text" required v-model="gameId" />
				</ion-item>

				<img :src="tst" />

				<br /><br />
				<ion-button class="fl-btn" @click="scanQrCode">Scan QR code</ion-button>
				<br /><br />
				<ion-button class="fl-btn" @click="joinGame">Join</ion-button>

			</ion-list>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { IonButton, IonList, IonItem, IonLabel, IonInput } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { WsConnection } from '@/ws/WsConnection'
import { errorAlert } from '@/utils'
import LayoutMain from '@/layouts/LayoutMain.vue'
import { Decoder } from '@nuintun/qrcode'
import {CameraPhoto, CameraResultType, CameraSource, Plugins} from '@capacitor/core'
const { Camera } = Plugins

export default defineComponent({
	name: 'PageJoinGame',
	components: { LayoutMain, IonButton, IonList, IonItem, IonLabel, IonInput },
	setup () {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const gameId = ref<string>('')
		const ws = computed<WsConnection>(() => store.state.wsConnection)
		const tst = ref(null)

		watch(() => route.query.id, newValue => {
			if (newValue) {
				gameId.value = newValue as string
			}
		}, { immediate: true })

		const joinGame = async () => {
			if (gameId.value.trim().length) {
				const error = await ws.value.joinGame(gameId.value)
				if (error) {
					errorAlert(error, 'bottom')
				} else {
					gameId.value = ''
					router.push({ name: 'pageWaitingRoom' }).catch(() => null)
				}
			}
		}

		const scanQrCode = async () => {
			const image: CameraPhoto = await Camera.getPhoto({
				quality: 70,
				allowEditing: false,
				resultType: CameraResultType.DataUrl,
				source: CameraSource.Camera
			})

			const qrcode = new Decoder()
			qrcode.setOptions({
				inversionAttempts: 'attemptBoth'
			})
			tst.value = image.dataUrl
			qrcode.scan(image.dataUrl)
				.then(result => {
					alert('DONE')
					gameId.value = result.data
				})
				.catch(error => alert(error))
		}

		return {
			gameId,
			joinGame,
			scanQrCode,
			tst
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

<template>
	<ion-page>
		<ion-content :fullscreen="true">

			<div v-if="!isConnected">
				<ion-input v-model="name" />
				<ion-button @click="initConnection">Init connection</ion-button>
			</div>

			<div v-else>
				<ion-input v-model="gameCode" />
				<ion-button @click="emitJoinGame" :disabled="gameCreated">Join Game</ion-button><br><br>
				<ion-button @click="emitCreateGame" :disabled="gameCreated">Create Game</ion-button><br>
				<ion-button @click="disconnect">Disconnect</ion-button><br>
			</div>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue'
import { IonButton, IonPage, IonContent, IonInput } from '@ionic/vue'
import socket from '@/ws/socket'

export default defineComponent({
	name: 'WsTest',
	components: { IonButton, IonPage, IonContent, IonInput },
	setup () {
		const name = ref<string>('')
		const gameCode = ref<string>('')
		const isConnected = ref<boolean>(false)
		const gameCreated = ref<boolean>(false)

		const initConnection = () => {
			if (!name.value.trim()) {
				console.log('Name must not ne blank')
				return
			}
			// @ts-ignore
			socket.auth = { username: name.value }
			socket.connect()
			isConnected.value = true
		}

		const disconnect = () => {
			isConnected.value = false
			socket.disconnect()
		}

		const emitJoinGame = () => {
			socket.emit('game-join', String(gameCode.value))
		}

		const emitCreateGame = () => {
			socket.emit('game-create')
		}

		socket.on('game-join-error', (reason: string) => {
			console.log('Could not join the game: ' + reason)
		})

		socket.on('game-created', (gameId: string) => {
			console.log('Game created: ' + gameId)
			gameCode.value = gameId
			gameCreated.value = true
		})

		socket.on('game-joined', (gameId: string) => {
			console.log('Game joined: ' + gameId)
			gameCode.value = gameId
			gameCreated.value = true
		})

		onUnmounted(() => {
			socket.off('connect_error')
		})

		return {
			name,
			gameCode,
			isConnected,
			gameCreated,
			initConnection,
			disconnect,
			emitCreateGame,
			emitJoinGame
		}
	}
})
</script>

<style scoped>

</style>

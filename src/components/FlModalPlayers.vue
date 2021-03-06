<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Players</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="dismissModal">
					<ion-icon :icon="close" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content>
		<ion-list class="fl-player-list">
			<ion-item v-for="(player, i) in players" :key="player.id">
				<ion-label>
					<span class="fl-player-number">{{ i + 1 }}</span>
					{{ player.name }}
					<small>{{ player.id === myPlayerId ? '(You)' : '' }}</small>
					<ion-icon :icon="chatboxEllipses" class="fl-player-indicator" v-if="player.id === currentPlayerId" />
				</ion-label>
			</ion-item>
		</ion-list>
	</ion-content>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, modalController, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue'
import { close, chatboxEllipses } from 'ionicons/icons'
import { ClientPlayer } from '@/store/store'
import { useStore } from '@/store'

export default defineComponent({
	name: 'FlModalPlayers',
	components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonList, IonItem, IonLabel, IonIcon },
	setup () {
		const store = useStore()
		const dismissModal = () => modalController.dismiss()
		const players = computed<ClientPlayer[]>(() => store.getters['playersOrdered'])
		const myPlayerId = computed<string>(() => store.state.myPlayerId)
		const currentPlayerId = computed<string>(() => store.state.currentPlayerId)

		return {
			dismissModal,
			players,
			myPlayerId,
			currentPlayerId,
			close,
			chatboxEllipses
		}
	}
})
</script>

<style>

	.fl-player-number {
		display: inline-block;
		background: var(--ion-color-secondary);
		color: var(--ion-color-secondary-contrast);
		padding: 5px;
		width: 27px;
		text-align: center;
		border-radius: 50%;
		margin-right: 7px;
	}

	.fl-player-list {
		margin-right: 15px;
	}

	.fl-player-list ion-label {
		position: relative;
	}

	.fl-player-indicator {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

</style>

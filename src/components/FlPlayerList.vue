<template>
	<ion-list class="fl-player-list">
		<ion-item v-for="(player, i) in players" :key="player.id">
			<ion-label>
				<span class="fl-player-number">{{ i + 1 }}</span>
				<div>
					{{ player.name }} <small>{{ player.id === myPlayerId ? '(You)' : '' }}</small>
					<div v-if="player.address" class="fl-location-info">{{ player.address }}</div>
				</div>

				<ion-icon :icon="chatboxEllipses" class="fl-player-indicator" v-if="player.id === currentPlayerId" />
				<div v-if="withScore" class="fl-player-indicator">{{ player.score }}<small>pt</small></div>
			</ion-label>
		</ion-item>
	</ion-list>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue'
import { chatboxEllipses } from 'ionicons/icons'
import { useStore } from '@/store'
export default defineComponent({
	name: 'FlPlayerList',
	components: { IonList, IonItem, IonLabel, IonIcon },
	props: {
		withScore: { type: Boolean, default: false },
		players: { type: Array, required: true }
	},
	setup () {
		const store = useStore()
		const myPlayerId = computed<string>(() => store.state.myPlayerId)
		const currentPlayerId = computed<string>(() => store.state.currentPlayerId)
		return {
			myPlayerId,
			currentPlayerId,
			chatboxEllipses
		}
	}
})
</script>

<style scoped>
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
		display: flex;
		align-items: center;
	}

	.fl-player-indicator {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.fl-location-info {
		font-size: 10px;
		padding-top: 3px;
		color: var(--ion-color-medium-shade)
	}
</style>

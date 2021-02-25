<template>
	<ion-page>
		<ion-content :fullscreen="true">

			<div v-if="gameActive">

				<fl-game-panel-top />
				<fl-table-top />
				<fl-table-bottom />
				<fl-game-panel-bottom />

			</div>
			<div v-else>
				<h2>Game has not been started yet</h2>
				<ion-button @click="startNewGame">Start Game</ion-button>
			</div>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { IonButton, IonPage, IonContent } from '@ionic/vue'
import FlGamePanelBottom from '@/components/FlGamePanelBottom.vue'
import FlGamePanelTop from '@/components/FlGamePanelTop.vue'
import FlTableTop from '@/components/FlTableTop.vue'
import FlTableBottom from '@/components/FlTableBottom.vue'

export default defineComponent({
	name: 'Blank',
	components: { IonButton, IonPage, IonContent, FlGamePanelBottom, FlGamePanelTop, FlTableTop, FlTableBottom },
	setup () {
		const store = useStore()
		const gameActive = computed<boolean>(() => store.state.gameActive)
		const startNewGame = () => store.dispatch('init')

		return {
			gameActive,
			startNewGame
		}
	}
})
</script>

<style scoped>

</style>

<template>
	<ion-page>
		<ion-content :fullscreen="true" v-if="gameLoaded">
			<fl-game-panel-top @show-players="showPlayers" />
			<fl-table-top />
			<fl-table-bottom />
			<fl-game-panel-bottom />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IonPage, IonContent, modalController  } from '@ionic/vue'
import FlGamePanelBottom from '@/components/FlGamePanelBottom.vue'
import FlGamePanelTop from '@/components/FlGamePanelTop.vue'
import FlTableTop from '@/components/FlTableTop.vue'
import FlTableBottom from '@/components/FlTableBottom.vue'
import FlModalPlayers from '@/components/FlModalPlayers.vue'
import { useStore } from '@/store'
export default defineComponent({
	name: 'PageGameTable',
	components: { IonPage, IonContent, FlGamePanelBottom, FlGamePanelTop, FlTableTop, FlTableBottom },
	setup () {
		const store = useStore()
		const gameLoaded = computed<boolean>(() => !!store.state.game && store.state.game.started)
		const showPlayers = async () => {
			const modal = await modalController.create({ component: FlModalPlayers })
			return modal.present();
		}

		return {
			showPlayers,
			gameLoaded
		}
	}
})
</script>

<style scoped>

</style>

<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<fl-game-panel-top />
			<fl-table-top />
			<fl-table-bottom />
			<fl-game-panel-bottom />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonContent } from '@ionic/vue'
import FlGamePanelBottom from '@/components/FlGamePanelBottom.vue'
import FlGamePanelTop from '@/components/FlGamePanelTop.vue'
import FlTableTop from '@/components/FlTableTop.vue'
import FlTableBottom from '@/components/FlTableBottom.vue'
export default defineComponent({
	name: 'PageGameTable',
	components: { IonPage, IonContent, FlGamePanelBottom, FlGamePanelTop, FlTableTop, FlTableBottom },
})
</script>

<style scoped>

</style>

<template>
	<fl-buttons-bottom>
		<ion-button :disabled="!canResetMove" @click="resetMove">Cancel</ion-button>
		<ion-button :disabled="!canFinishRound" @click="finishMove">Confirm</ion-button>
	</fl-buttons-bottom>
<!--	<div style="display: block; width: 100%; height: 50px;"></div>-->
<!--	<ion-footer class="fl-footer">-->
<!--		<div class="fl-footer__inner">-->
<!--			<ion-button :disabled="!canResetMove" @click="resetMove">Cancel</ion-button>-->
<!--			<ion-button :disabled="!canFinishRound" @click="finishMove">Confirm</ion-button>-->
<!--		</div>-->
<!--	</ion-footer>-->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { IonButton } from '@ionic/vue'
import FlButtonsBottom from '@/components/FlButtonsBottom.vue'

export default defineComponent({
	name: 'FlGamePanelBottom',
	components: { IonButton, FlButtonsBottom },
	setup () {
		const store = useStore()

		const isMyTurn = computed<boolean>(() => store.getters['isMyTurn'])
		const canResetMove = computed<boolean>(() => isMyTurn.value && store.getters['canResetMove'])
		const canFinishRound = computed<boolean>(() => isMyTurn.value && store.getters['canFinishRound'])
		const resetMove = () => store.dispatch('resetMove')
		const finishMove = () => store.dispatch('commitGameTurn')

		return {
			canResetMove,
			canFinishRound,
			finishMove,
			resetMove
		}
	}
})
</script>

<style scoped>

	/*.fl-footer {*/
	/*	position: fixed;*/
	/*	bottom: 0;*/
	/*}*/

	/*.fl-footer__inner {*/
	/*	display: flex;*/
	/*	width: 100%;*/
	/*	height: 50px;*/
	/*	background-color: white;*/
	/*}*/

	/*.fl-footer__inner ion-button {*/
	/*	margin: 0;*/
	/*	width: 50%;*/
	/*	height: 100%;*/
	/*	--border-radius: 0;*/
	/*}*/

</style>

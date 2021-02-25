<template>
	<div style="display: block; width: 100%; height: 50px;"></div>
	<ion-footer class="fl-footer">
		<div class="fl-footer__inner">
			<ion-button :disabled="!canResetMove" @click="resetMove">Cancel</ion-button>
			<ion-button :disabled="!canFinishRound" @click="finishMove">Confirm</ion-button>
		</div>
	</ion-footer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { IonButton, IonFooter } from '@ionic/vue'

export default defineComponent({
	name: 'FlGamePanelBottom',
	components: { IonButton, IonFooter },
	setup () {
		const store = useStore()

		const canResetMove = computed<boolean>(() => store.getters['canResetMove'])
		const canFinishRound = computed<boolean>(() => store.getters['canFinishRound'])
		const finishMove = () => store.dispatch('finishRound')
		const resetMove = () => store.dispatch('resetMove')

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

	.fl-footer {
		position: fixed;
		bottom: 0;
	}

	.fl-footer__inner {
		display: flex;
		width: 100%;
		height: 50px;
		background-color: white;
	}

	.fl-footer__inner ion-button {
		margin: 0;
		width: 50%;
		height: 100%;
		--border-radius: 0;
	}

</style>

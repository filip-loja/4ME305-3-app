<template>
	<fl-buttons-bottom>
		<ion-button :disabled="!canResetMove" @click="resetMove">Cancel</ion-button>
		<ion-button :disabled="!canFinishRound" @click="finishMove">Confirm</ion-button>
	</fl-buttons-bottom>
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

</style>

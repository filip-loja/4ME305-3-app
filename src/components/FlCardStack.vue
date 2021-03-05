<template>
	<div class="fl-card-stack">
		<ion-button size="large" @click="emitClick">
			<ion-icon :icon="add" />
		</ion-button>
		<img src="assets/card_stack.png" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton, IonIcon } from '@ionic/vue'
import { add } from 'ionicons/icons'
import { useStore } from '@/store'
export default defineComponent({
	name: 'FlCardStack',
	emits: ['click'],
	components: { IonButton, IonIcon },
	setup (props, { emit }) {
		const store = useStore()
		const emitClick = () => {
			if (store.getters['isMyTurn']) {
				emit('click')
			}
		}
		return {
			add,
			emitClick
		}
	}
})
</script>

<style scoped>

	.fl-card-stack {
		display: block;
		height: 25vh;
		position: relative;
	}

	.fl-card-stack img {
		display: block;
		height: 100%;
		margin: 0 auto;
	}

	.fl-card-stack ion-button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		--border-radius: 50%;
		height: 68px !important;
		opacity: 0.9;
	}

</style>

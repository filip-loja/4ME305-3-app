<template>
	<div class="fl-card ion-activatable ripple-parent" @click="emitClick">
		<img :src="src" />
		<ion-ripple-effect />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import { Card } from '@/store/store'
import { useStore } from '@/store'
export default defineComponent({
	name: 'FlCard',
	components: {IonRippleEffect },
	emits: ['click'],
	props: {
		model: { type: Object as PropType<Card>, required: true }
	},
	setup (props, { emit }) {
		const store = useStore()
		const emitClick = () => {
			if (store.getters['isMyTurn']) {
				emit('click')
			}
		}

		const src = computed<string>(() => `assets/cards/${props.model.src}.jpg`)

		return {
			emitClick,
			src
		}
	}
})
</script>

<style scoped>

	.fl-card {
		display: block;
		width: 100%;
		height: 1px;
		padding-bottom: calc(159% - 1px);
		overflow: hidden;
		border-radius: 7px;
		position: relative;
		border: 1px solid black;
		box-shadow: 0 0 3px var(--ion-color-medium-tint);
	}

	.fl-card img {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

</style>

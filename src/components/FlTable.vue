<template>
	<div class="fl-deck-background">
		<div class="fl-deck-background__overlay" :style="[withColor ? {backgroundColor: bgColor} : {}]"></div>
		<div class="fl-deck-background__slot">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
	name: 'FlTable',
	props: {
		withColor: { type: Boolean, default: false }
	},
	setup () {
		const store = useStore()
		const bgColor = computed<string>(() => {
			const colors = {
				red: '#ff5b71',
				green: '#44e283',
				ball: '#ffd948',
				acorn: '#ceba8c'
			}
			return colors[store.state.currentColor]
		})
		return {
			bgColor
		}
	}
})
</script>

<style scoped>

	.fl-deck-background {
		display: block;
		width: 100%;
		box-sizing: border-box;
		padding: 5px;
		background-image: url('/assets/wood_texture.jpg');
		position: relative;
	}

	.fl-deck-background__overlay {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.5;
	}

	.fl-deck-background__slot {
		display: block;
		width: 100%;
		height: 100%;
	}

</style>

<template>
	<div class="fl-deck-background" :style="{backgroundColor: bgColor}">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
	name: 'FlDeckBackground',
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
	}

</style>

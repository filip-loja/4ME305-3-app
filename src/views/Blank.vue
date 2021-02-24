<template>
	<div>
		Blank Page
		<b>hello</b>
		<div>{{ val }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
	name: 'Blank',
	setup () {
		const store = useStore()

		const val = computed(() => store.state.sample)

		return {
			val
		}
	}
})
</script>

<style scoped>

</style>

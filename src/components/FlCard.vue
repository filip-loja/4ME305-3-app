<template>
	<ion-card @click="emitClick" :style="{backgroundColor: bgColor}">
		<ion-card-content class="ion-text-center">
			<div>{{ model.type }}</div>
			<div>{{ model.color }}</div>
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { IonCard, IonCardContent } from '@ionic/vue'
import { Card } from '@/store/store'
export default defineComponent({
	name: 'FlCard',
	components: { IonCard, IonCardContent },
	emits: ['click'],
	props: {
		model: { type: Object as PropType<Card>, required: true }
	},
	setup (props, { emit }) {

		const emitClick = () => {
			emit('click')
		}

		const bgColor = computed<string>(() => {
			const colors = {
				red: '#ff5b71',
				green: '#44e283',
				ball: '#ffd948',
				acorn: '#ceba8c'
			}
			return colors[props.model.color]
		})

		return {
			emitClick,
			bgColor
		}
	}
})
</script>

<style scoped>

</style>

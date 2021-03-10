<template>
	<div style="display: block; width: 100%; height: 30vh"></div>
	<fl-table with-color class="fl-table-top">
		<div class="fl-table-top__inner">
			<fl-card-stack @click="takeCard" />
			<div class="fl-table-top__color">
				<img :src="colorIcon" />
			</div>
			<div class="fl-table-top__preview">
				<transition name="bounce" mode="out-in">
					<fl-card :model="upperCard" :key="upperCard.id" />
				</transition>
			</div>
		</div>
	</fl-table>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import FlTable from '@/components/FlTable.vue'
import { useStore } from '@/store'
import FlCardStack from '@/components/FlCardStack.vue'
import { Card } from '@/store/store'
import FlCard from '@/components/FlCard.vue'
export default defineComponent({
	name: 'FlTableTop',
	components: { FlTable, FlCardStack, FlCard },
	setup () {
		const store = useStore()
		const takeCard = () => store.dispatch('takeCard')
		const upperCard = computed<Card>(() => store.getters['deckUpperCard'])

		const colorIcon = computed<string>(() => {
			const colors = {
				red: 'red.png',
				green: 'green.png',
				ball: 'ball.png',
				acorn: 'acorn.png'
			}
			// @ts-ignore
			return `assets/colors/${colors[ store.getters['currentColor'] ]}`
		})

		return {
			takeCard,
			upperCard,
			colorIcon
		}
	}
})
</script>

<style scoped>

	.fl-table-top {
		display: block;
		width: 100%;
		height: 30vh;
		box-sizing: border-box;
		padding: 0 15px;
		border-bottom: 3px solid #432617;
		position: fixed;
		top: 50px;
		z-index: 20;
	}

	.fl-table-top__inner {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.fl-table-top__color {
		position: relative;
		display: block;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		margin: 0 20px 0 10px;
		border: 2px solid #432617;
		z-index: 10;
		overflow: hidden;
	}

	.fl-table-top__color img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.fl-table-top__preview {
		width: 90px;
	}

	.bounce-enter-active {
		animation: bounce-in .3s ease-out both;
		perspective: 1000px;
	}

	.bounce-leave-active {
		animation: bounce-in .3s reverse ease-in both;
		perspective: 1000px;
	}

	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}

</style>

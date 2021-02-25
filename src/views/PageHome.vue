<template>
	<layout-main title="Pharaoh">
		<div class="fl-page-home">
			<div>
				<ion-button class="fl-btn" @click="createGame">Create Game</ion-button>
				<ion-button class="fl-btn" :router-link="{name: 'pageJoinGame'}">Join Game</ion-button>
				<ion-button class="fl-btn" :router-link="{name: 'pageProfile'}">Edit Profile</ion-button>
			</div>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton } from '@ionic/vue'
import { useStore } from '@/store'
import LayoutMain from '@/layouts/LayoutMain.vue'

export default defineComponent({
	name: 'PageHome',
	components: { LayoutMain, IonButton },
	setup () {
		const store = useStore()

		const createGame = () => store.dispatch('createGame')

		return {
			createGame
		}
	}
})
</script>

<style scoped>

	.fl-page-home {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		min-height: 100%;
		justify-content: center;
		align-items: center;
	}

	.fl-page-home > div {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
	}

	.fl-page-home ion-button {
		width: 80%;
		margin: 10px;
	}

</style>

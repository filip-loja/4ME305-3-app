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
import { defineComponent, computed } from 'vue'
import { IonButton } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { WsConnection } from '@/ws/WsConnection'
import { checkProfile } from '@/utils'
import LayoutMain from '@/layouts/LayoutMain.vue'

export default defineComponent({
	name: 'PageHome',
	components: { LayoutMain, IonButton },
	setup () {
		const store = useStore()
		const router = useRouter()
		const ws = computed<WsConnection>(() => store.state.wsConnection)

		const createGame = async () => {
			if (await checkProfile()) {
				const success = await ws.value.createGame()
				if (success) {
					router.push({ name: 'pageWaitingRoom' }).catch(() => null)
					// TODO implementovat else vetvu
				}
			} else {
				router.push({ name: 'pageProfile' }).catch(() => null)
			}
		}

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

<template>
	<layout-main title="Waiting room">
		<ion-card>
			<ion-card-content class="ion-text-center">
				{{ game.id }}
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-content>
				<ion-list>
					<ion-item v-for="(player, index) in game.players" :key="player.id">
						<ion-label>{{ index + 1 }} {{ player.name }}</ion-label>
					</ion-item>
				</ion-list>
			</ion-card-content>
		</ion-card>
		<div>
			<template v-if="game.creator">
				<ion-button :disabled="!canStart">Start game</ion-button>
				<ion-button>Cancel game</ion-button>
			</template>
			<template v-else>
				<ion-button>Leave game</ion-button>
			</template>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import LayoutMain from '@/layouts/LayoutMain.vue'
import { useStore } from '@/store'
import { Game } from '@/store/store'
import { IonButton, IonList, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/vue'
export default defineComponent({
	name: 'PageWaitingRoom',
	components: { LayoutMain, IonButton, IonList, IonItem, IonLabel, IonCard, IonCardContent },
	setup () {
		const store = useStore()
		const game = computed<Game>(() => store.state.game)

		const canStart = computed<boolean>(() => store.state.game.players.length > 1)

		// TODO Call beforeRouteLeave guards in deactivated components.
		// odhlasit sa z hry ked idem prec zo stranky

		return {
			game,
			canStart
		}
	}
})
</script>

<style scoped>

</style>

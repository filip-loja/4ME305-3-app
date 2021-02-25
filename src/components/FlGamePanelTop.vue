<template>
	<div style="display: block; width: 100%; height: 50px;"></div>
	<ion-header class="fl-game-header">
		<div class="fl-game-header__inner">
			<div></div>
			<div>
				<ion-button color="danger" @click="exitGame">
					<ion-icon :icon="exit" />
				</ion-button>
			</div>
		</div>
	</ion-header>
</template>

<script>
import { defineComponent } from 'vue'
import { IonButton, IonHeader, IonIcon, alertController } from '@ionic/vue'
import { exit } from 'ionicons/icons'
export default defineComponent({
	name: 'FlGamePanelTop',
	components: { IonButton, IonHeader, IonIcon },
	setup () {

		const exitGame = async () => {
			const alert = await alertController
				.create({
					header: 'Please confirm!',
					message: 'Are you sure you want to leave the game. This will also terminate the for all other players.',
					backdropDismiss: false,
					buttons: [
						{
							text: 'No',
							role: 'cancel',
							cssClass: 'warning'
						},
						{
							text: 'Yes',
							// TODO realne implementovat
							handler: () => location.reload()
						}
					]
				})
			return alert.present()
		}

		return {
			exitGame,
			exit
		}
	}
})
</script>

<style scoped>

	.fl-game-header {
		position: fixed;
		top: 0;
	}

	.fl-game-header__inner {
		display: flex;
		width: 100%;
		height: 50px;
		background-color: white;
		justify-content: flex-end;
	}

	.fl-game-header__inner ion-button {
		height: 100%;
		margin: 0;
		--border-radius: 0;
		--box-shadow: none;
	}

</style>

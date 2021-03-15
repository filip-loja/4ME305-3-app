<template>
	<ion-page id="main-content">
		<ion-progress-bar type="indeterminate" color="warning" v-if="isLoading" />

		<ion-header v-if="!noHeader">
			<ion-toolbar>
				<ion-buttons slot="start" v-if="back">
					<ion-button :router-link="{name: 'pageHome'}">
						<ion-icon slot="icon-only" :icon="arrowBack" />
					</ion-button>
				</ion-buttons>
				<ion-title>{{ title }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<slot />
		</ion-content>

	</ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
	menuController,
	IonIcon,
	IonProgressBar
} from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'
import { useStore } from '@/store'

export default defineComponent({
	name: 'LayoutMain',
	components: {
		IonPage,
		IonHeader,
		IonContent,
		IonTitle,
		IonToolbar,
		IonButtons,
		IonButton,
		IonIcon,
		IonProgressBar
	},
	props: {
		title: { type: String, required: true },
		back: { type: Boolean, default: false },
		noHeader: { type: Boolean, default: false }
	},
	setup () {
		const store = useStore()
		const isLoading = computed<boolean>(() => store.getters['isLoading'])
		const openMenu = async () => await menuController.open()
		return {
			openMenu,
			arrowBack,
			isLoading
		}
	}

})
</script>

<style scoped>

</style>

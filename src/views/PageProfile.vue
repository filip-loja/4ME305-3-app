<template>
	<layout-main title="Profile">
		<div class="fl-page-profile">
			<ion-list>

				<ion-item class="ion-no-padding">
					<ion-label position="floating">Your name</ion-label>
					<ion-input type="text" required v-model="userName" />
				</ion-item>

				<br /><br />
				<ion-button class="fl-btn" @click="saveUsername">Save Changes</ion-button>

			</ion-list>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonList, IonItem, IonLabel, IonInput } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import LayoutMain from '@/layouts/LayoutMain.vue'

export default defineComponent({
	name: 'PageHome',
	components: { LayoutMain, IonButton, IonList, IonItem, IonLabel, IonInput },
	setup () {
		const store = useStore()
		const router = useRouter()
		const userName = ref<string>(null)
		userName.value = store.state.storage.localProfile.username

		const saveUsername = async () => {
			await store.dispatch('saveUsername', userName.value)
			router.push({ name: 'pageHome' }).catch(() => null)
		}

		return {
			saveUsername,
			userName
		}
	}
})
</script>

<style scoped>

	.fl-page-profile .fl-btn {
		width: 80%;
		margin: 0 auto;
		display: block;
	}

</style>

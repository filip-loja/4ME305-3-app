<template>
	<layout-main title="Profile" back>
		<div class="fl-page-profile">

			<div class="fl-avatar" @click="changeImage">
				<fl-stored-image v-if="picture" :src="picture" />
				<img v-else src="assets/avatar.jpg" />
			</div>

			<ion-list>

				<ion-item class="ion-no-padding">
					<ion-label position="floating">Your name</ion-label>
					<ion-input type="text" required v-model="userName" />
				</ion-item>

				<br /><br />
				<ion-button class="fl-btn" @click="saveUsername">Save username</ion-button>

			</ion-list>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { IonButton, IonList, IonItem, IonLabel, IonInput } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import LayoutMain from '@/layouts/LayoutMain.vue'
import FlStoredImage from '@/components/FlStoredImage.vue'

import { CameraPhoto, CameraResultType, FilesystemDirectory, Plugins } from '@capacitor/core'
const { Camera, Filesystem } = Plugins

export default defineComponent({
	name: 'PageHome',
	components: { LayoutMain, FlStoredImage, IonButton, IonList, IonItem, IonLabel, IonInput },
	setup () {
		const store = useStore()
		const router = useRouter()
		const userName = ref<string>(null)
		userName.value = store.state.storage.localProfile.username
		const picture = computed<string>(() => store.state.storage.localProfile.picture)

		const saveUsername = async () => {
			await store.dispatch('saveUsername', userName.value)
			router.push({ name: 'pageHome' }).catch(() => null)
		}

		const changeImage = async () => {
			const image: CameraPhoto = await Camera.getPhoto({
				quality: 70,
				allowEditing: false,
				resultType: CameraResultType.Base64
			})
			const oldFileName = picture.value
			const newFileName = Date.now() + '.' + image.format
			await Filesystem.writeFile({
				data: image.base64String,
				path: newFileName,
				directory: FilesystemDirectory.Data
			})
			store.commit('storage/SAVE_PICTURE', newFileName)

			if (oldFileName) {
				await Filesystem.deleteFile({
					path: oldFileName,
					directory: FilesystemDirectory.Data
				})
			}
		}

		return {
			saveUsername,
			changeImage,
			userName,
			picture
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

	.fl-avatar {
		width: 130px;
		height: 130px;
		margin: 10px auto 0;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		border: 3px solid var(--ion-color-primary);
	}

	.fl-avatar > * {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

</style>

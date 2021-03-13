<template>
	<img v-if="imageSrc" :src="imageSrc" @contextmenu="onContextMenu" />
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { IonImg } from '@ionic/vue'
import { FilesystemDirectory, Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

const loadMedia = (path: string): Promise<string> => {
	return Filesystem.readFile({
		path, directory: FilesystemDirectory.Data
	}).then(file => `data:image/jpeg;base64,${file.data}`)
}

export default defineComponent({
	name: 'FlStoredImage',
	components: { IonImg },
	props: {
		src: { type: String, default: null }
	},
	setup (props) {
		const imageSrc = ref(null)

		watch(() => props.src, async (newSrc) => {
			if (newSrc) {
				imageSrc.value = await loadMedia(newSrc)
			}
		}, { immediate: true })

		const onContextMenu = (e: Event) => {
			e.preventDefault()
			return true
		}

		return {
			imageSrc,
			onContextMenu,
		}
	}
})
</script>

<style scoped>

</style>

import { FilesystemDirectory, FilesystemEncoding, Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

const STATE_NAME = 'vuex-pharaoh.json'

const saveState = (state: any) => {
	Filesystem.writeFile({
		path: STATE_NAME,
		data: JSON.stringify(state),
		directory: FilesystemDirectory.Data,
		encoding: FilesystemEncoding.UTF8
	}).then(() => console.log('STORE SAVED'))
}

export const loadState = async () => {
	let vuexContent = null
	let success
	try {
		vuexContent = await Filesystem.readFile({
			path: STATE_NAME,
			directory: FilesystemDirectory.Data,
			encoding: FilesystemEncoding.UTF8
		})
		success = true
		vuexContent = JSON.parse(vuexContent.data)
	} catch (e) {
		vuexContent = e
		success = false
	}

	return Promise.resolve({
		vuexContent,
		success
	})
}

export const persistent = (store: any) => {
	store.subscribe((mutation: any, state: any) => {
		if (mutation.type.startsWith('storage') && mutation.type !== 'storage/HYDRATE') {
			saveState(state.storage)
		}
	})
}

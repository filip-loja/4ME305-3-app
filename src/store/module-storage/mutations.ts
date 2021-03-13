
import { StorageState } from '@/store/module-storage/module-storage'

export const HYDRATE = (state: StorageState, payload: StorageState): void => {
	Object.assign(state, payload)
}

export const SAVE_USERNAME = (state: StorageState, username: string): void => {
	state.localProfile.username = username.trim()
}

export const SAVE_PICTURE = (state: StorageState, picture: string): void => {
	state.localProfile.picture = picture
}


import { StorageState } from '@/store/module-storage/module-storage'

export const SAVE_USERNAME = (state: StorageState, username: string): void => {
	state.localProfile.username = username.trim()
}

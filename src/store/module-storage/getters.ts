
import { StorageState } from '@/store/module-storage/module-storage'

export const filledInProfile = (state: StorageState): boolean => {
	return !!state.localProfile.username.trim()
}

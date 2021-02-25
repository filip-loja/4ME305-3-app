import { ActionContext } from 'vuex';
import { RootState } from '@/store/store'
import { StorageState } from '@/store/module-storage/module-storage'

type A = ActionContext<StorageState, RootState>

export const sample = (context: A) => {
	// nothing
}


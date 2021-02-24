import { createStore, Store, useStore as baseUseStore, ModuleTree } from 'vuex'
import { InjectionKey } from 'vue'
import { RootState } from '@/store/store'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import { rootState } from '@/store/state'

export const key: InjectionKey<Store<RootState>> = Symbol()
export function useStore () {
	return baseUseStore(key)
}

const store = createStore<RootState>({

  state: rootState,
	mutations,
	actions
})

export default store

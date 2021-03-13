import { createStore, Store, useStore as baseUseStore, ModuleTree } from 'vuex'
import { InjectionKey } from 'vue'
import { StoreDef } from '@/store/store'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import * as getters from '@/store/getters'
import { rootState } from '@/store/state'
import moduleStorage from '@/store/module-storage'
import { persistent } from '@/store/persistent'

export const key: InjectionKey<Store<StoreDef>> = Symbol()
export function useStore () {
	return baseUseStore(key)
}

const store = createStore<StoreDef>({

	modules: { storage: moduleStorage },
	plugins: [ persistent ],

  state: rootState,
	mutations,
	actions,
	getters
})

export default store

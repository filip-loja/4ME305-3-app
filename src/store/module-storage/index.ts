
import { Module } from 'vuex/types'
import { StorageState } from '@/store/module-storage/module-storage'
import { RootState } from '@/store/store'
import { stateStorage } from '@/store/module-storage/state'
import * as actions from '@/store/module-storage/actions'
import * as mutations from '@/store/module-storage/mutations'
import * as getters from '@/store/module-storage/getters'

const moduleStorage: Module<StorageState, RootState> = {
	namespaced: true,
	state: stateStorage,
	actions,
	mutations,
	getters
}

export default moduleStorage

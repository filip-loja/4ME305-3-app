import { ActionContext } from 'vuex'
import { RootState } from '@/store/store'

type A = ActionContext<RootState, RootState>

export const sampleAction = async (context: A): Promise<void> => {
	context.commit('SAMPLE_MUTATION')
}

import {Store} from 'vuex'
import {RootState} from '@/store/store'
import { actionSheetController } from '@ionic/vue'

export const changeColor = async (store: Store<RootState>): Promise<void> => {
	const actionSheet = await actionSheetController.create({
		header: 'Change current color',
		backdropDismiss: false,
		buttons: [
			{
				text: 'Red',
				handler: () => store.commit('CHANGE_CURRENT_COLOR', 'red'),
			},
			{
				text: 'Green',
				handler: () => store.commit('CHANGE_CURRENT_COLOR', 'green'),
			},
			{
				text: 'Ball',
				handler: () => store.commit('CHANGE_CURRENT_COLOR', 'ball'),
			},
			{
				text: 'Acorn',
				handler: () => store.commit('CHANGE_CURRENT_COLOR', 'acorn'),
			}
		],
	})
	return actionSheet.present()
}

import { Store } from 'vuex'
import { RootState } from '@/store/store'
import { actionSheetController, toastController } from '@ionic/vue'

export const withTimeout = (timeout: number, userPromise: Promise<any>): Promise<any> => {
	const checkPromise = new Promise((resolve, reject) => {
		return setTimeout(() => reject('Request timed out'), timeout)
	})
	return Promise.race([checkPromise, userPromise])
}

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

export const errorAlert = async (message: string): Promise<void> => {
	const toast = await toastController
		.create({
			message,
			duration: 1500,
			position: 'top',
			color: 'danger'
		})
	return toast.present();
}

import { Store } from 'vuex'
import {Geo, RootState} from '@/store/store'
import store from '@/store'
import { actionSheetController, toastController } from '@ionic/vue'
import { GeolocationPosition } from '@capacitor/core'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

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

export const errorAlert = async (message: string, position: 'top' | 'bottom' = 'top'): Promise<void> => {
	const toast = await toastController
		.create({
			message,
			duration: 1500,
			position: position,
			cssClass: 'fl-error-alert'
		})
	return toast.present();
}

export const checkProfile = async () => {
	if (!store.getters['storage/filledInProfile']) {
		await errorAlert('You have to set up your profile first!', 'bottom')
		return Promise.resolve(false)
	} else {
		return Promise.resolve(true)
	}
}

export const getMyCoordinates = async () => {
	const request = Geolocation.getCurrentPosition().then((location: GeolocationPosition) => {
		const result: Geo = {
			lat: location.coords.latitude,
			lon: location.coords.longitude
		}
		return Promise.resolve(result)
	}).catch(() => null)
	return withTimeout(10000, request).then(resp => {
		if (typeof resp === 'string') {
			return Promise.resolve(null)
		} else {
			return Promise.resolve(resp)
		}
	})
}

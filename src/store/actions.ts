import { ActionContext } from 'vuex'
import {Card, CardColor, GameInitialState, RootState} from '@/store/store'
import {changeColor, errorAlert} from '@/utils'
import router from '@/router'
import {WsConnection} from '@/ws/WsConnection'
import {toastController} from '@ionic/vue'

type A = ActionContext<RootState, RootState>

function canGiveCard (upperCard: Card, newCard: Card, currentColor: CardColor): boolean {
	// TODO rozsirit logiku
	if (newCard.type === 'miner') return true
	return upperCard.type === newCard.type || currentColor === newCard.color
}

function canGiveMoreCards (upperCard: Card, newCard: Card): boolean {
	return upperCard.type === newCard.type
}

export const initGame = (context: A, initialState: GameInitialState) => {
	context.commit('INITIALIZE_GAME', initialState)
	context.commit('START_GAME', initialState)
	router.push({ name: 'pageGameTable' }).catch(() => null)
	console.log(initialState)
}

export const takeCard = async (context: A): Promise<any> => {
	if (context.getters['pendingEffect'] === 'ace') {
		return await errorAlert('"Ace" card is in effect. You have to play another "Ace" or wait one round.')
	}
	if (context.getters.cardsTaken) {
		return await errorAlert('You cannot take more cards in this round!')
	}
	if (context.getters.cardsGiven) {
		return await errorAlert('You cannot give away cards and take cards in one turn!')
	}
	// TODO kontrola ci su karty v stacku
	// TODO zohladnit efekty
	context.commit('TAKE_CARDS', context.getters['cardsToTake'])
	return null
}

export const giveCard = async (context: A, currentCard: Card): Promise<any> => {
	if (context.getters['cardsTaken']) {
		return await errorAlert('You cannot give away cards after you have taken cards from stack!')
	}
	if (context.getters['pendingEffect'] === 'seven' && currentCard.type !== 'seven') {
		return await errorAlert('The player before you played "seven". You need to take cards or play another "seven".')
	}

	const upperCard = context.getters['deckUpperCard']

	if (
		(!context.getters['cardsGiven'] && canGiveCard(upperCard, currentCard, context.getters['currentColor'])) ||
		(context.getters['cardsGiven'] && canGiveMoreCards(upperCard, currentCard))
	) {
		context.commit('GIVE_CARD', currentCard)

		if (currentCard.type === 'miner') {
			await changeColor(context as any)
		} else if (currentCard.color !== context.getters['currentColor']) {
			context.commit('CHANGE_CURRENT_COLOR', currentCard.color)
		}

		return null
	}
	return await errorAlert('You cannot give away this card!')
}

export const resetMove = async (context: A): Promise<any> => {
	if (!context.getters['canResetMove']) {
		return await errorAlert('You cannot do that!')
	}
	context.commit('RESET_MOVE')
	return null
}

export const commitGameTurn = async (context: A): Promise<any> => {
	if (!context.getters['canFinishRound']) {
		return await errorAlert('You did not perform any action!')
	}
	context.commit('PRESERVE_EFFECTS')
	await context.state.wsConnection.commitGameTurn()
}

export const initServerConnection = async (context: A) => {
	const connection = new WsConnection()
	context.commit('SET_CONNECTION', connection)
}

export const saveUsername = async (context: A, payload: string) => {
	let success
	if (context.state.wsConnection) {
		success = await context.state.wsConnection.changeUserName(payload)
	} else {
		success = true
	}
	if (success) {
		context.commit('storage/SAVE_USERNAME', payload)
		const toast = await toastController
			.create({
				message: 'Your profile was updated successfully',
				duration: 1500,
				position: 'bottom',
				color: 'success'
			})
		await toast.present()
	}
}

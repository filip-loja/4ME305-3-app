import { ActionContext } from 'vuex'
import {Card, CardColor, PayloadInitCards, PayloadInitPlayerCard, RootState} from '@/store/store'
import {getCards} from '@/cards'
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

export const init = async (context: A) => {
	const cards: Card[] = await getCards()

	const cardsPlayer1: Card[] = cards.splice(0, context.state.player1.startingCardsNum)
	const cardsPlayer2: Card[] = cards.splice(0, context.state.player2.startingCardsNum)
	context.commit('INIT_PLAYER_CARDS', { id: 1, cards: cardsPlayer1 } as PayloadInitPlayerCard)
	context.commit('INIT_PLAYER_CARDS', { id: 2, cards: cardsPlayer2 } as PayloadInitPlayerCard)
	const playerId = Math.random() > 0.5 ? 1 : 2

	const payload: PayloadInitCards = {
		deckCard: cards.shift(),
		stackCards: cards
	}
	context.commit('INIT_CARDS', payload)
	context.commit('INIT_ROUND', playerId)
	context.commit('START_GAME')
}

export const takeCard = async (context: A): Promise<any> => {
	if (context.state.round.cardTaken) {
		return await errorAlert('You cannot take more cards in this round!')
	}
	if (context.state.round.cardsGiven.length) {
		return await errorAlert('You cannot take give away cards and take cards in one round!')
	}

	context.commit('TAKE_CARD', context.state.round.playerId)
	return null
}

export const giveCard = async (context: A, card: Card): Promise<any> => {
	if (context.state.round.cardTaken) {
		return await errorAlert('You cannot take give away cards after you have taken cards from stack!')
	}

	const upperCard = context.getters['upperCard']
	if (
		(!context.state.round.cardsGiven.length && canGiveCard(upperCard, card, context.state.currentColor)) ||
		(context.state.round.cardsGiven.length && canGiveMoreCards(upperCard, card))
	) {
		context.commit('GIVE_CARD', card)

		if (card.type === 'miner') {
			// TODO opravit type parametra
			await changeColor(context as any)
		} else if (card.color !== context.state.currentColor) {
			context.commit('CHANGE_CURRENT_COLOR', card.color)
		}

		// TODO effect
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

export const finishRound = async (context: A): Promise<any> => {
	if (!context.getters['canFinishRound']) {
		return await errorAlert('You did not perform any action!')
	}
	const playerId = context.state.round.playerId === 1 ? 2 : 1
	context.commit('INIT_ROUND', playerId)
	// TODO API request
	return null
}

export const createGame = async (context: A): Promise<any> => {
	if (!context.getters['storage/filledInProfile']) {
		await errorAlert('You have to set up your profile first!')
		router.push({ name: 'pageProfile' }).catch(() => null)
		return
	}
}

export const joinGame = async (context: A, gameId: string): Promise<any> => {
	if (!context.getters['storage/filledInProfile']) {
		await errorAlert('You have to set up your profile first!')
		router.push({ name: 'pageProfile' }).catch(() => null)
		return
	}
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

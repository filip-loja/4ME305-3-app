import { ActionContext } from 'vuex'
import {Card, CardColor, PayloadInitCards, PayloadInitPlayerCard, RootState} from '@/store/store'
import {getCards} from '@/cards'
import {changeColor} from '@/utils'

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

export const takeCard = (context: A): Promise<string> => {
	if (context.state.round.cardTaken) {
		return Promise.reject('You cannot take more cards in this round!')
	}
	if (context.state.round.cardsGiven.length) {
		return Promise.reject('You cannot take give away cards and take cards in one round!')
	}

	context.commit('TAKE_CARD', context.state.round.playerId)
	return Promise.resolve(null)
}

export const giveCard = async (context: A, card: Card): Promise<string> => {
	if (context.state.round.cardTaken) {
		return Promise.reject('You cannot take give away cards after you have taken cards from stack!')
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
		return Promise.resolve(null)
	}
	return Promise.reject('You cannot give away this card!')
}

export const resetMove = (context: A): Promise<string> => {
	if (!context.getters['canResetMove']) {
		return Promise.reject('You cannot do that!')
	}
	context.commit('RESET_MOVE')
	return Promise.resolve(null)
}

export const finishRound = (context: A): Promise<string> => {
	if (!context.getters['canFinishRound']) {
		return Promise.reject('You did not perform any action!')
	}
	const playerId = context.state.round.playerId === 1 ? 2 : 1
	context.commit('INIT_ROUND', playerId)
	// TODO API request
	return Promise.resolve(null)
}

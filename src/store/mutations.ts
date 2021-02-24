
import {Card, CardColor, PayloadInitCards, PayloadInitPlayerCard, RootState} from '@/store/store'

export const INIT_PLAYER_CARDS = (state: RootState, payload: PayloadInitPlayerCard): void => {
	if (payload.id === 1) {
		state.player1.cards = payload.cards
	} else {
		state.player2.cards = payload.cards
	}
}

export const START_GAME = (state: RootState): void => {
	state.gameActive = true
}

export const INIT_CARDS = (state: RootState, payload: PayloadInitCards): void => {
	state.cardStack = payload.stackCards
	state.cardDeck = [payload.deckCard]
	state.currentColor = payload.deckCard.color
}

export const INIT_ROUND = (state: RootState, playerId: number): void => {
	state.round.playerId = playerId
	state.round.cardsGiven = []
	state.round.cardTaken = false
	state.round.startColor = state.currentColor
}

export const GIVE_CARD = (state: RootState, card: Card): void => {
	const user = state.round.playerId === 1 ? state.player1 : state.player2
	const index = user.cards.findIndex(cardItem => cardItem.id === card.id)
	if (index >= 0) {
		user.cards.splice(index, 1)
		state.cardDeck.unshift(card)
		state.round.cardsGiven.unshift(card)
	}
}

export const RESET_MOVE = (state: RootState): void => {
	const user = state.round.playerId === 1 ? state.player1 : state.player2
	user.cards.push(...state.round.cardsGiven)
	state.cardDeck.splice(0, state.round.cardsGiven.length)
	state.round.cardsGiven = []
	state.currentColor = state.round.startColor
}

export const TAKE_CARD = (state: RootState, playerId: number): void => {
	const card = state.cardStack.shift()
	const model = playerId === 1 ? state.player1 : state.player2
	model.cards.push(card)
	state.round.cardTaken = true
}

export const CHANGE_CURRENT_COLOR = (state: RootState, color: CardColor): void => {
	state.currentColor = color
}

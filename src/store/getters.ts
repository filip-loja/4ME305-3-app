
import {Card, CardColor, CardType, RootState} from '@/store/store'

export const isMyTurn = (state: RootState): boolean => {
	return state.currentPlayerId === state.myPlayerId
}

export const myCards = (state: RootState): Card[] => {
	const resp: Card[] = []
	for (const cardId of state.myPlayerCardIds) {
		resp.push(state.cardMap[cardId])
	}
	return resp
}

export const deckUpperCard = (state: RootState): Card => {
	return state.cardMap[state.cardsDeck[0]]
}

export const currentType = (state: RootState): CardType => {
	return state.cardMap[state.cardsDeck[0]].type
}

export const currentColor = (state: RootState): CardColor => {
	return state.game.currentTurn.newColor || state.cardColor
}

export const currentPlayerName = (state: RootState): string => {
	return (state.game.players.find(player => player.id === state.currentPlayerId) || {}).name
}

export const cardsTaken = (state: RootState): boolean => {
	return state.game.currentTurn.cardsTaken.length > 0
}

export const cardsGiven = (state: RootState): boolean => {
	return state.game.currentTurn.cardsGiven.length > 0
}

export const canResetMove = (state: RootState, getters: any): boolean => {
	return !getters.cardsTaken && getters.cardsGiven
}

export const canFinishRound = (state: RootState, getters: any): boolean => {
	return getters.cardsTaken || getters.cardsGiven
}

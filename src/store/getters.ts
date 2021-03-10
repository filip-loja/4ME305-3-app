
import {Card, CardColor, CardEffect, CardType, ClientPlayer, GameReportScore, RootState} from '@/store/store'

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
	const id = state.cardsDeck[state.cardsDeck.length - 1]
	return state.cardMap[id]
}

export const currentType = (state: RootState): CardType => {
	return state.cardMap[state.cardsDeck[0]].type
}

export const currentColor = (state: RootState): CardColor => {
	return state.game.currentTurn.newColor || state.cardColor
}

export const currentPlayerName = (state: RootState, getters: any): string => {
	if (!state.game) return null
	const name = (state.game.players.find(player => player.id === state.currentPlayerId) || {}).name
	return getters.isMyTurn ? 'My turn' : `${name}'s turn`
}

export const cardsTaken = (state: RootState): boolean => {
	return state.game.currentTurn.cardsTaken.length > 0
}

export const cardsGiven = (state: RootState): boolean => {
	return state.game.currentTurn.cardsGiven.length > 0
}

export const playersOrdered = (state: RootState): ClientPlayer[] => {
	const ids = state.game.playerOrder
	const players = state.game.players.slice()
	players.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
	return players
}

export const pendingEffect = (state: RootState): CardEffect => {
	if (state.activeEffects.length) {
		return state.activeEffects[0]
	}
	return null
}

export const cardsToTake = (state: RootState, getters: any): number => {
	if (getters.pendingEffect === 'seven') {
		return 3 * state.activeEffects.length
	}
	return 1
}

export const userScoreOrder = (state: RootState): GameReportScore[] => {
	return Object.values(state.game.result.players).sort((a, b) => b.score - a.score)
}

export const timePlayed = (state: RootState): string => {
	const s = state.game.result.time
	const pad = (n: any, z = 2) => ('00' + n).slice(-z);
	return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0)
}

export const canResetMove = (state: RootState, getters: any): boolean => {
	return !getters.cardsTaken && getters.cardsGiven
}

export const canFinishRound = (state: RootState, getters: any): boolean => {
	return getters.cardsTaken || getters.cardsGiven || getters.pendingEffect === 'ace'
}

export const turnWaited = (state: RootState, getters: any): boolean => {
	return !getters.cardsTaken && !getters.cardsGiven && getters.pendingEffect === 'ace'
}

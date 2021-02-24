
import {Card, Player, RootState} from '@/store/store'

export const upperCard = (state: RootState): Card => {
	return state.cardDeck[0]
}

export const currentPlayer = (state: RootState): Player => {
	if (state.round.playerId === 1) {
		return state.player1
	} else {
		return state.player2
	}
}

export const canResetMove = (state: RootState): boolean => {
	return !state.round.cardTaken && state.round.cardsGiven.length > 0
}

export const canFinishRound = (state: RootState): boolean => {
	return state.round.cardTaken || state.round.cardsGiven.length > 0
}


import {
	Card,
	CardColor,
	ClientPlayer,
	GameInitialState, PayloadNextTurn,
	RootState
} from '@/store/store'
import {WsConnection} from '@/ws/WsConnection'

export const SET_CONNECTION = (state: RootState, wsConnection: WsConnection): void => {
	state.wsConnection = wsConnection
}

export const SET_PLAYER_ID = (state: RootState, playerId: string): void => {
	state.myPlayerId = playerId
}

export const SET_CURRENT_PLAYER_ID = (state: RootState, playerId: string): void => {
	state.currentPlayerId = playerId
}

export const CREATE_GAME = (state: RootState, payload: { id: string; creator: boolean }): void => {
	if (!payload) {
		state.game = null
	} else {
		state.game = {
			id: payload.id,
			started: false,
			players: [],
			creator: payload.creator,
			currentTurn: {
				cardsGiven: [],
				cardsTaken: [],
				newEffects: [],
				newColor: null
			}
		}
	}
}

export const COMMIT_CURRENT_TURN = (state: RootState): void => {
	if (state.game.currentTurn.newColor) {
		state.cardColor = state.game.currentTurn.newColor
	}
	state.activeEffects = state.game.currentTurn.newEffects
	state.game.currentTurn = {
		cardsGiven: [],
		cardsTaken: [],
		newEffects: [],
		newColor: null
	}
}

export const PREPARE_NEW_TURN = (state: RootState, payload: PayloadNextTurn): void => {
	if (payload.stackAdded.length) {
		state.cardsStack.push(...payload.stackAdded)
	}
	if (payload.stackRemoved.length) {
		state.cardsStack = state.cardsStack.filter(id => !payload.stackRemoved.includes(id))
	}
	if (payload.deckAdded.length) {
		state.cardsDeck.unshift(...payload.deckAdded)
	}
	if (payload.deckRemoved.length) {
		state.cardsDeck = state.cardsDeck.filter(id => !payload.deckRemoved.includes(id))
	}
	state.cardColor = payload.color
	state.activeEffects = payload.effects
	state.currentPlayerId = payload.currentPlayer
}

export const ADD_PLAYERS = (state: RootState, newPlayers: ClientPlayer[]): void => {
	if (state.game) {
		state.game.players.push(...newPlayers)
	}
}

export const REMOVE_PLAYER = (state: RootState, id: string): void => {
	if (state.game) {
		const index = state.game.players.findIndex(player => player.id === id)
		if (index >= 0) {
			state.game.players.splice(index, 1)
		}
	}
}

export const INITIALIZE_GAME = (state: RootState, initialState: GameInitialState): void => {
	state.currentPlayerId = initialState.currentPlayer
	state.myPlayerCardIds = initialState.cardAssignment[state.myPlayerId]
	state.cardsDeck = initialState.deck
	state.cardsStack = initialState.stack
	state.cardColor = initialState.color
}

export const START_GAME = (state: RootState): void => {
	state.game.started = true
}

export const TAKE_CARDS = (state: RootState, cardsNum: number): void => {
	const cardIds = state.cardsStack.splice(0, cardsNum)
	state.myPlayerCardIds.push(...cardIds)
	state.game.currentTurn.cardsTaken.push(...cardIds)
}

export const CHANGE_CURRENT_COLOR = (state: RootState, color: CardColor): void => {
	state.game.currentTurn.newColor = color
}

export const GIVE_CARD = (state: RootState, card: Card): void => {
	state.cardsDeck.unshift(card.id)
	state.game.currentTurn.cardsGiven.push(card.id)
	state.myPlayerCardIds = state.myPlayerCardIds.filter(id => id !== card.id)
	if (card.type === 'seven') state.game.currentTurn.newEffects.push('seven')
	if (card.type === 'ace') state.game.currentTurn.newEffects.push('ace')
}

export const RESET_MOVE = (state: RootState): void => {
	const givenCards = state.game.currentTurn.cardsGiven
	state.myPlayerCardIds.push(...givenCards)
	state.cardsDeck = state.cardsDeck.filter(cardId => !givenCards.includes(cardId))
	state.game.currentTurn.cardsGiven = []
	state.game.currentTurn.newEffects = []
	state.game.currentTurn.newColor = null
}





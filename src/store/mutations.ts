
import {
	Card,
	CardColor,
	ClientPlayer,
	RoundInitialState, CommittedTurn,
	RootState, GameReport, RemovePlayerDiff
} from '@/store/store'
import {WsConnection} from '@/ws/WsConnection'

export const SET_CONNECTION = (state: RootState, wsConnection: WsConnection): void => {
	state.wsConnection = wsConnection
}

export const SET_LOADING = (state: RootState, payload: number): void => {
	state.loading += payload
	if (state.loading < 0) {
		state.loading = 0
	}
}

export const RESET_STATE = (state: RootState): void => {
	state.game = null
	state.currentPlayerId = null
	state.cardColor = null
	state.activeEffects = []
	state.myPlayerCardIds = []
	state.cardsDeck = []
	state.cardsStack = []
}

export const SET_PLAYER_ID = (state: RootState, playerId: string): void => {
	state.myPlayerId = playerId
}

export const CREATE_GAME = (state: RootState, payload: { id: string; creator: boolean; qr: string }): void => {
	if (!payload) {
		state.game = null
	} else {
		console.log(payload.id)
		state.game = {
			id: payload.id,
			qr: payload.qr,
			started: false,
			finished: false,
			round: 1,
			players: [],
			creator: payload.creator,
			playerOrder: [],
			currentTurn: {
				cardsGiven: [],
				cardsTaken: [],
				newEffects: [],
				newColor: null
			},
			result: null
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

export const PREPARE_NEW_TURN = (state: RootState, payload: CommittedTurn): void => {
	if (state.myPlayerId !== payload.lastPlayer) {
		console.log('FULL PREPARE')
		if (payload.stackRemoved.length) {
			state.cardsStack = state.cardsStack.filter(id => !payload.stackRemoved.includes(id))
		}
		if (payload.deckAdded.length) {
			state.cardsDeck.push(...payload.deckAdded)
		}
		state.cardColor = payload.color
		state.activeEffects = payload.effects
	}

	state.currentPlayerId = payload.currentPlayer
	if (payload.reshuffle.length) {
		console.log('RESHUFFLE')
		state.cardsStack.push(...payload.reshuffle)
		state.cardsDeck = state.cardsDeck.filter(id => !payload.reshuffle.includes(id))
	}
	console.log(state.activeEffects)
}

export const ADD_PLAYERS = (state: RootState, newPlayers: ClientPlayer[]): void => {
	if (state.game) {
		state.game.players.push(...newPlayers)
	}
}

export const REMOVE_PLAYER = (state: RootState, diff: RemovePlayerDiff): void => {
	if (state.game) {
		const index = state.game.players.findIndex(player => player.id === diff.id)
		if (index >= 0) {
			state.game.players.splice(index, 1)
		}
		if (state.game.started) {
			state.currentPlayerId = diff.currentPlayer
			state.cardsStack.push(...diff.stackAdded)
		}
	}
}

export const INIT_ROUND = (state: RootState, initialState: RoundInitialState): void => {
	state.currentPlayerId = initialState.currentPlayer
	state.myPlayerCardIds = initialState.cardAssignment[state.myPlayerId]
	state.cardsDeck = initialState.deck
	state.cardsStack = initialState.stack
	state.cardColor = initialState.color
	state.game.playerOrder = initialState.playerOrder
	state.game.round = initialState.roundNumber
	state.activeEffects = initialState.effects
}

export const START_GAME = (state: RootState): void => {
	state.game.started = true
}

export const FINISH_GAME = (state: RootState, result: GameReport): void => {
	state.game.finished = true
	state.game.result = result
	state.currentPlayerId = null
}

export const TAKE_CARDS = (state: RootState, cardsNum: number): void => {
	const cardIds = state.cardsStack.splice(0, cardsNum)
	state.myPlayerCardIds.push(...cardIds)
	state.game.currentTurn.cardsTaken.push(...cardIds)
	state.activeEffects = []
}

export const CHANGE_CURRENT_COLOR = (state: RootState, color: CardColor): void => {
	state.game.currentTurn.newColor = color
}

export const PRESERVE_EFFECTS = (state: RootState): void => {
	state.game.currentTurn.newEffects.push(...state.activeEffects)
}

export const WAIT_TURN = (state: RootState): void => {
	state.activeEffects.pop()
}

export const GIVE_CARD = (state: RootState, card: Card): void => {
	state.cardsDeck.push(card.id)
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





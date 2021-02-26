import { RootState } from '@/store/store'

export const rootState: RootState = {
	wsConnection: null,
	clientId: null,
	game: null,

	gameActive: false,
	cardDeck: [],
	cardStack: [],
	currentColor: null,
	player1: {
		id: 1,
		name: 'Filip',
		cards: [],
		startingCardsNum: 5
	},
	player2: {
		id: 2,
		name: 'Martin',
		cards: [],
		startingCardsNum: 5
	},
	round: {
		playerId: 1,
		cardTaken: false,
		cardsGiven: [],
		startColor: null
	}
}

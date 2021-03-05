import { RootState } from '@/store/store'
import cardMap from '@/cards'

export const rootState: RootState = {
	activeEffects: [],
	wsConnection: null,
	game: null,
	cardMap: cardMap,
	cardColor: null,
	currentPlayerId: null,
	myPlayerId: null,
	myPlayerCardIds: [],
	cardsDeck: [],
	cardsStack: []
}

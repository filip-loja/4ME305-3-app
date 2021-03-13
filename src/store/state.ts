import { RootState } from '@/store/store'
import cardMap from '@/cards'

export const rootState: RootState = {
	cardMap: cardMap,
	cardIdOrder: Object.keys(cardMap),
	wsConnection: null,
	myPlayerId: null,
	game: null,
	currentPlayerId: null,
	cardColor: null,
	activeEffects: [],
	myPlayerCardIds: [],
	cardsDeck: [],
	cardsStack: [],
	loading: 0,
}

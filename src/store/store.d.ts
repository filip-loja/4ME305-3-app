import { StorageState } from '@/store/module-storage/module-storage'
import { WsConnection } from '@/ws/WsConnection'

export interface RootState {
	wsConnection: WsConnection;
	game: Game;
	cardMap: CardMap;
	cardsStack: string[];
	cardsDeck: string[];
	cardColor: CardColor;
	activeEffects: CardEffect[];
	currentPlayerId: string;
	myPlayerId: string;
	myPlayerCardIds: string[];
}

export interface ModulesDef {
	storage?: StorageState
}

export type StoreDef = RootState & ModulesDef

export type CardColor = 'red' | 'green' | 'ball' | 'acorn'
export type CardType = 'seven' | 'eight' | 'nine' | 'ten' | 'jack' | 'miner' | 'king' | 'ace'
export type CardEffect = 'seven' | 'ace'

export interface Card {
	id: string;
	color: CardColor;
	type: CardType;
	src: string;
}

export interface CardMap {
	[key: string]: Card;
}

export interface ClientPlayer {
	id: string;
	name: string;
}

export interface Game {
	id: string;
	started: boolean;
	players: ClientPlayer[];
	creator: boolean;
	currentTurn: CurrentTurn;
}

export interface CurrentTurn {
	cardsTaken: string[];
	cardsGiven: string[];
	newColor: CardColor;
	newEffects: CardEffect[];
}

export interface GameInitialState {
	stack: string[];
	deck: string[];
	color: CardColor;
	type: CardType;
	currentPlayer: string;
	cardAssignment: {
		[key: string]: string[]
	}
}

export interface PayloadNextTurn {
	stackAdded: string[];
	stackRemoved: string[];
	deckAdded: string[];
	deckRemoved: string[];
	color: CardColor;
	effects: CardEffect[];
	currentPlayer: string;
}

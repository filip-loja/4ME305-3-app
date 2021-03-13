import { StorageState } from '@/store/module-storage/module-storage'
import { WsConnection } from '@/ws/WsConnection'

export interface RootState {
	wsConnection: WsConnection;
	game: Game;
	cardMap: CardMap;
	cardIdOrder: string[];
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
	address: string;
}

export interface Game {
	id: string;
	qr: string;
	round: number;
	started: boolean;
	finished: boolean;
	players: ClientPlayer[];
	creator: boolean;
	currentTurn: CurrentTurn;
	playerOrder: string[];
	result: GameReport;
}

export interface CurrentTurn {
	cardsTaken: string[];
	cardsGiven: string[];
	newColor: CardColor;
	newEffects: CardEffect[];
}

export interface RoundInitialState {
	stack: string[];
	deck: string[];
	color: CardColor;
	type: CardType;
	currentPlayer: string;
	playerOrder: string[];
	effects: CardEffect[];
	roundNumber: number;
	cardAssignment: {
		[key: string]: string[]
	}
}

export interface CommittedTurn {
	stackRemoved: string[];
	deckAdded: string[];
	color: CardColor;
	effects: CardEffect[];
	currentPlayer: string;
	lastPlayer: string;
	reshuffle: string[];
}

export interface GameReport {
	time: number;
	rounds: number;
	players: {
		[key: string]: GameReportScore;
	}
}

export interface GameReportScore {
	id: string;
	name: string;
	score: number;
}

export interface RemovePlayerDiff {
	id: string;
	currentPlayer?: string;
	stackAdded?: string[]
}

export interface NewGamePayload {
	id: string;
	geo: Geo;
}

export interface Geo {
	lat: number;
	lon: number;
}

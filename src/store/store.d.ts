
export interface RootState {
	sample: string;
	gameActive: boolean;
	player1: Player;
	player2: Player;
	cardStack: Card[];
	cardDeck: Card[];
	round: Round;
	currentColor: CardColor;
}

export type CardColor = 'red' | 'green' | 'ball' | 'acorn'
export type CardType = 'seven' | 'eight' | 'nine' | 'ten' | 'jack' | 'miner' | 'king' | 'ace'

export interface Card {
	id: number;
	color: CardColor;
	type: CardType;
	src: string;
}

export interface Player {
	id: number;
	name: string;
	picture?: string;
	startingCardsNum: number;
	cards: Card[];
}

export interface Round {
	playerId: number;
	cardTaken: boolean;
	cardsGiven: Card[];
	startColor: CardColor;
}

export interface PayloadInitPlayerCard {
	id: number;
	cards: Card[];
}

export interface PayloadInitCards {
	stackCards: Card[];
	deckCard: Card;
}

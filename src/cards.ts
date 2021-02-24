import { Card } from './store/store'
import arrayShuffle from 'array-shuffle'

export function getCards(): Promise<Card[]> {
	return new Promise<Card[]>(resolve => {
		setTimeout(() => {
			resolve(arrayShuffle([
				{id: 1, color: 'red', type: 'seven'},
				{id: 2, color: 'green', type: 'seven'},
				{id: 3, color: 'ball', type: 'seven'},
				{id: 4, color: 'acorn', type: 'seven'},
				{id: 5, color: 'red', type: 'eight'},
				{id: 6, color: 'green', type: 'eight'},
				{id: 7, color: 'ball', type: 'eight'},
				{id: 8, color: 'acorn', type: 'eight'},
				{id: 9, color: 'red', type: 'nine'},
				{id: 10, color: 'green', type: 'nine'},
				{id: 11, color: 'ball', type: 'nine'},
				{id: 12, color: 'acorn', type: 'nine'},
				{id: 13, color: 'red', type: 'ten'},
				{id: 14, color: 'green', type: 'ten'},
				{id: 15, color: 'ball', type: 'ten'},
				{id: 16, color: 'acorn', type: 'ten'},
				{id: 17, color: 'red', type: 'jack'},
				{id: 18, color: 'green', type: 'jack'},
				{id: 19, color: 'ball', type: 'jack'},
				{id: 20, color: 'acorn', type: 'jack'},
				{id: 21, color: 'red', type: 'miner'},
				{id: 22, color: 'green', type: 'miner'},
				{id: 23, color: 'ball', type: 'miner'},
				{id: 24, color: 'acorn', type: 'miner'},
				{id: 25, color: 'red', type: 'king'},
				{id: 26, color: 'green', type: 'king'},
				{id: 27, color: 'ball', type: 'king'},
				{id: 28, color: 'acorn', type: 'king'},
				{id: 29, color: 'red', type: 'ace'},
				{id: 30, color: 'green', type: 'ace'},
				{id: 31, color: 'ball', type: 'ace'},
				{id: 32, color: 'acorn', type: 'ace'}
			]))
		}, 100)
	})
}

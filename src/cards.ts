import { Card } from './store/store'
import arrayShuffle from 'array-shuffle'

export function getCards(): Promise<Card[]> {
	return new Promise<Card[]>(resolve => {
		setTimeout(() => {
			resolve(arrayShuffle([
				{id: 1, color: 'red', type: 'seven', src: 'red_seven'},
				{id: 2, color: 'green', type: 'seven', src: 'green_seven'},
				{id: 3, color: 'ball', type: 'seven', src: 'ball_seven'},
				{id: 4, color: 'acorn', type: 'seven', src: 'acorn_seven'},
				{id: 5, color: 'red', type: 'eight', src: 'red_eight'},
				{id: 6, color: 'green', type: 'eight', src: 'green_eight'},
				{id: 7, color: 'ball', type: 'eight', src: 'ball_eight'},
				{id: 8, color: 'acorn', type: 'eight', src: 'acorn_eight'},
				{id: 9, color: 'red', type: 'nine', src: 'red_nine'},
				{id: 10, color: 'green', type: 'nine', src: 'green_nine'},
				{id: 11, color: 'ball', type: 'nine', src: 'ball_nine'},
				{id: 12, color: 'acorn', type: 'nine', src: 'acorn_nine'},
				{id: 13, color: 'red', type: 'ten', src: 'red_ten'},
				{id: 14, color: 'green', type: 'ten', src: 'green_ten'},
				{id: 15, color: 'ball', type: 'ten', src: 'ball_ten'},
				{id: 16, color: 'acorn', type: 'ten', src: 'acorn_ten'},
				{id: 17, color: 'red', type: 'jack', src: 'red_jack'},
				{id: 18, color: 'green', type: 'jack', src: 'green_jack'},
				{id: 19, color: 'ball', type: 'jack', src: 'ball_jack'},
				{id: 20, color: 'acorn', type: 'jack', src: 'acorn_jack'},
				{id: 21, color: 'red', type: 'miner', src: 'red_miner'},
				{id: 22, color: 'green', type: 'miner', src: 'green_miner'},
				{id: 23, color: 'ball', type: 'miner', src: 'ball_miner'},
				{id: 24, color: 'acorn', type: 'miner', src: 'acorn_miner'},
				{id: 25, color: 'red', type: 'king', src: 'red_king'},
				{id: 26, color: 'green', type: 'king', src: 'green_king'},
				{id: 27, color: 'ball', type: 'king', src: 'ball_king'},
				{id: 28, color: 'acorn', type: 'king', src: 'acorn_king'},
				{id: 29, color: 'red', type: 'ace', src: 'red_ace'},
				{id: 30, color: 'green', type: 'ace', src: 'green_ace'},
				{id: 31, color: 'ball', type: 'ace', src: 'ball_ace'},
				{id: 32, color: 'acorn', type: 'ace', src: 'acorn_ace'}
			]))
		}, 100)
	})
}

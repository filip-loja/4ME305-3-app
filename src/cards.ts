import {Card, CardMap} from './store/store'
import arrayShuffle from 'array-shuffle'

export default Object.freeze({
	'1': {id: '1', color: 'red', type: 'seven', src: 'red_seven'},
	'2': {id: '2', color: 'green', type: 'seven', src: 'green_seven'},
	'3': {id: '3', color: 'ball', type: 'seven', src: 'ball_seven'},
	'4': {id: '4', color: 'acorn', type: 'seven', src: 'acorn_seven'},
	'5': {id: '5', color: 'red', type: 'eight', src: 'red_eight'},
	'6': {id: '6', color: 'green', type: 'eight', src: 'green_eight'},
	'7': {id: '7', color: 'ball', type: 'eight', src: 'ball_eight'},
	'8': {id: '8', color: 'acorn', type: 'eight', src: 'acorn_eight'},
	'9': {id: '9', color: 'red', type: 'nine', src: 'red_nine'},
	'10': {id: '10', color: 'green', type: 'nine', src: 'green_nine'},
	'11': {id: '11', color: 'ball', type: 'nine', src: 'ball_nine'},
	'12': {id: '12', color: 'acorn', type: 'nine', src: 'acorn_nine'},
	'13': {id: '13', color: 'red', type: 'ten', src: 'red_ten'},
	'14': {id: '14', color: 'green', type: 'ten', src: 'green_ten'},
	'15': {id: '15', color: 'ball', type: 'ten', src: 'ball_ten'},
	'16': {id: '16', color: 'acorn', type: 'ten', src: 'acorn_ten'},
	'17': {id: '17', color: 'red', type: 'jack', src: 'red_jack'},
	'18': {id: '18', color: 'green', type: 'jack', src: 'green_jack'},
	'19': {id: '19', color: 'ball', type: 'jack', src: 'ball_jack'},
	'20': {id: '20', color: 'acorn', type: 'jack', src: 'acorn_jack'},
	'21': {id: '21', color: 'red', type: 'miner', src: 'red_miner'},
	'22': {id: '22', color: 'green', type: 'miner', src: 'green_miner'},
	'23': {id: '23', color: 'ball', type: 'miner', src: 'ball_miner'},
	'24': {id: '24', color: 'acorn', type: 'miner', src: 'acorn_miner'},
	'25': {id: '25', color: 'red', type: 'king', src: 'red_king'},
	'26': {id: '26', color: 'green', type: 'king', src: 'green_king'},
	'27': {id: '27', color: 'ball', type: 'king', src: 'ball_king'},
	'28': {id: '28', color: 'acorn', type: 'king', src: 'acorn_king'},
	'29': {id: '29', color: 'red', type: 'ace', src: 'red_ace'},
	'30': {id: '30', color: 'green', type: 'ace', src: 'green_ace'},
	'31': {id: '31', color: 'ball', type: 'ace', src: 'ball_ace'},
	'32': {id: '32', color: 'acorn', type: 'ace', src: 'acorn_ace'}
}) as CardMap

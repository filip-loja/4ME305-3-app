import { Socket } from 'socket.io-client/build/socket'
import { Store } from 'vuex'
import {ClientPlayer, GameInitialState, StoreDef} from '@/store/store'
import { io } from 'socket.io-client'
import { resetGame, withTimeout } from '@/utils'
import store from '@/store'

export class WsConnection {

	url = 'http://192.168.0.101:3000'
	socket: Socket = null
	store: Store<StoreDef> = store

	constructor () {
		this.createSocket()

		this.socket.on('connection-established', (clientId: string) => this.store.commit('SET_CLIENT_ID', clientId))
		this.socket.on('reset', (reason: string) => {
			console.log(reason)
			resetGame()
		})

		this.socket.on('game-player-added', (newPlayer: ClientPlayer) => {
			this.store.commit('ADD_PLAYERS', [newPlayer])
			console.log('Player added: ', newPlayer)
		})

		this.socket.on('game-player-removed', (playerId: string) => this.store.commit('REMOVE_PLAYER', playerId))

		this.socket.on('game-started', (initialState: GameInitialState) => this.store.dispatch('initGame', initialState))

	}

	createSocket () {
		const userName = this.store.state.storage.localProfile.username
		if (userName) {
			this.socket = io(this.url, { autoConnect: false })
			// @ts-ignore
			this.socket.auth = { username: userName }
			this.socket.connect()
			console.log('Socket connection created')
		}
	}

	changeUserName (username: string): Promise<boolean> {
		return this.syncEmit('client-rename', username)
	}

	async createGame (): Promise<boolean> {
		try {
			const id = await this.syncEmit('game-create')
			this.store.commit('SET_GAME', { id, creator: true })
			return Promise.resolve(true)
		} catch (e) {
			console.log(e)
			return Promise.resolve(false)
		}
	}

	async joinGame (gameId: string): Promise<string> {
		try {
			const resp = await this.syncEmit('game-join', gameId)
			if (resp.success) {
				this.store.commit('SET_GAME', { id: gameId, creator: false })
				this.store.commit('ADD_PLAYERS', resp.players)
				return Promise.resolve(null)
			} else {
				return Promise.resolve(resp.message)
			}
		} catch (e) {
			console.log(e)
			return Promise.resolve(e)
		}
	}

	async leaveGame (): Promise<string> {
		try {
			const resp = await this.syncEmit('game-leave', this.store.state.game.id)
			if (resp.success) {
				this.store.commit('SET_GAME', null)
				return Promise.resolve(null)
			} else {
				return Promise.resolve(resp.message)
			}
		} catch (e) {
			console.log(e)
			return Promise.resolve(e)
		}
	}

	startGame (): void {
		const gameId = this.store.state.game.id
		this.socket.emit('game-start', gameId)
	}

	syncEmit (eventName: string, payload: any = null): Promise<any> {
		let resolver: any = null
		const request = new Promise(resolve => {
			resolver = resolve
			this.socket.emit(eventName, payload)
		})
		this.socket.on(eventName + '-resp', (data: any) => {
			resolver(data)
		})
		return withTimeout(5000, request)
	}
}

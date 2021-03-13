import { Socket } from 'socket.io-client/build/socket'
import { Store } from 'vuex'
import {
	ClientPlayer,
	RoundInitialState,
	CommittedTurn,
	StoreDef,
	GameReport,
	RemovePlayerDiff,
	NewGamePayload
} from '@/store/store'
import { io } from 'socket.io-client'
import {getMyCoordinates, withTimeout} from '@/utils'
import store from '@/store'
import QRCode from 'qrcode'

export class WsConnection {

	// url = 'http://server-pharaoh-loja.westeurope.azurecontainer.io:3000/'
	url = 'http://192.168.0.101:3000'
	socket: Socket = null
	store: Store<StoreDef> = store

	constructor () {
		this.createSocket()

		this.socket.on('connection-established', (playerId: string) => this.store.commit('SET_PLAYER_ID', playerId))
		this.socket.on('reset', (reason: string) => this.store.dispatch('resetState', reason))
		this.socket.on('disconnect', (reason: string) => this.store.dispatch('connectionLost', reason))

		this.socket.on('game-player-added', (newPlayer: ClientPlayer) => this.store.commit('ADD_PLAYERS', [newPlayer]))

		this.socket.on('game-player-removed', (diff: RemovePlayerDiff) => this.store.commit('REMOVE_PLAYER', diff))

		this.socket.on('game-round-new', (initialState: RoundInitialState) => this.store.dispatch('initRound', initialState))
		this.socket.on('game-new-turn', (payload: CommittedTurn) => this.store.commit('PREPARE_NEW_TURN', payload))
		this.socket.on('game-finish', (result: GameReport) => this.store.dispatch('finishRound', result))
		this.socket.on('game-terminated', (reason: string) => this.store.dispatch('gameTerminated', reason))

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

	async createGame (requestedId: string = null): Promise<any> {
		try {
			const geolocation = await getMyCoordinates()
			const payload: NewGamePayload = {
				id: requestedId,
				geo: geolocation
			}
			const resp = await this.syncEmit('game-create', payload)
			if (resp.success) {
				const qr = await QRCode.toDataURL(resp.id)
				this.store.commit('CREATE_GAME', { id: resp.id, qr, creator: true })
			}
			return Promise.resolve(resp)
		} catch (e) {
			return Promise.resolve({ success: false, message: e })
		}
	}

	async joinGame (gameId: string): Promise<string> {
		try {
			const geolocation = await getMyCoordinates()
			const payload: NewGamePayload = {
				id: gameId,
				geo: geolocation
			}
			const resp = await this.syncEmit('game-join', payload)
			if (resp.success) {
				const qr = await QRCode.toDataURL(gameId)
				this.store.commit('CREATE_GAME', { qr, id: gameId, creator: false })
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

	leaveGame (): void {
		this.socket.emit('game-leave', this.store.state.game.id)
		this.store.commit('RESET_STATE')
	}

	startGame (): void {
		const gameId = this.store.state.game.id
		this.socket.emit('game-start', gameId)
	}

	async commitGameTurn (): Promise<string> {
		try {
			const resp = await this.syncEmit('game-turn-commit', {
				id: store.state.game.id, payload: this.store.state.game.currentTurn
			})
			if (resp.success) {
				this.store.commit('COMMIT_CURRENT_TURN')
				return Promise.resolve(null)
			} else {
				return Promise.resolve(resp.message)
			}
		} catch (e) {
			console.log(e)
			return Promise.resolve(e)
		}
	}

	syncEmit (eventName: string, payload: any = null): Promise<any> {
		this.store.commit('SET_LOADING', 1)
		let resolver: any = null
		const request = new Promise(resolve => {
			resolver = resolve
			this.socket.emit(eventName, payload)
		})
		this.socket.on(eventName + '-resp', (data: any) => {
			resolver(data)
		})
		return withTimeout(5000, request).then(resp => {
			this.store.commit('SET_LOADING', -1)
			return resp
		})
	}
}

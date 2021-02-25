import { Socket } from 'socket.io-client/build/socket'
import { Store } from 'vuex'
import { StoreDef } from '@/store/store'
import { io } from 'socket.io-client'
import { withTimeout } from '@/utils'
import store from '@/store'

export class WsConnection {

	url = 'http://localhost:3000'
	socket: Socket = null
	store: Store<StoreDef> = store

	constructor () {
		this.createSocket()

		this.socket.on('connection-established', (clientId: string) => this.store.commit('SET_CLIENT_ID', clientId))

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

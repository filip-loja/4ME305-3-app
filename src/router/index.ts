import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { checkProfile } from '@/utils'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/PageHome.vue'),
		name: 'pageHome',
		beforeEnter: () => {
			if (store.state.game && store.state.game.started) {
				return { name: 'pageGameTable' }
			} else {
				return true
			}
		}
  },
	{
		path: '/profile',
		component: () => import('@/views/PageProfile.vue'),
		name: 'pageProfile'
	},
	{
		path: '/join-game',
		component: () => import('@/views/PageJoinGame.vue'),
		name: 'pageJoinGame',
		beforeEnter: async () => {
			if (await checkProfile()) {
				return true
			} else {
				return { name: 'pageProfile' }
			}
		}
	},
	{
		path: '/waiting-room',
		component: () => import('@/views/PageWaitingRoom.vue'),
		name: 'pageWaitingRoom',
		beforeEnter: () => {
			if (store.state.game) {
				return true
			} else {
				return { name: 'pageHome' }
			}
		}
	},
	{
		path: '/game-table',
		component: () => import('@/views/PageGameTable.vue'),
		name: 'pageGameTable',
		beforeEnter: () => {
			if (store.state.game && store.state.game.started) {
				return true
			} else {
				return { name: 'pageHome' }
			}
		}
	},
	{
		path: '/game-result',
		component: () => import('@/views/PageGameResult.vue'),
		name: 'pageGameResult',
		beforeEnter: () => {
			if (store.state.game && store.state.game.finished) {
				return true
			} else {
				return { name: 'pageHome' }
			}
		}
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { checkProfile } from '@/utils'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/PageHome.vue'),
		name: 'pageHome'
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
		path: '/blank',
		component: () => import('@/views/Blank.vue')
	},
	// {
	// 	path: '/ws',
	// 	component: () => import('@/views/WsTest.vue')
	// }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

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
		component: () => import('@/views/PageHome.vue'),
		name: 'pageJoinGame'
	},
  {
    path: '/folder/:id',
    component: () => import ('../views/Folder.vue')
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

export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName:'home' */'@/components/home')
  },
  {
    path: '/buy',
    name: 'buy',
    component: () => import(/* webpackChunkName:'buy' */'@/components/buy')
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: () => import(/* webpackChunkName:'subscribe' */'@/components/subscribe')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName:'sign' */'@/components/sign')
  },
  {
    path: '/owner',
    name: 'owner',
    component: () => import(/* webpackChunkName:'owner' */'@/components/owner')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName:'customer' */'@/components/customer')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/components/pages/404')
  }
]

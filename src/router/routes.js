export default [
  {
    path: '/real_estate/saler/home',
    name: 'home',
    component: () => import(/* webpackChunkName:'home' */'@/components/home')
  },
  {
    path: '/real_estate/saler/buy',
    name: 'buy',
    component: () => import(/* webpackChunkName:'buy' */'@/components/buy')
  },
  {
    path: '/real_estate/saler/subscribe',
    name: 'subscribe',
    component: () => import(/* webpackChunkName:'subscribe' */'@/components/subscribe')
  },
  {
    path: '/real_estate/saler/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName:'sign' */'@/components/sign')
  },
  {
    path: '/real_estate/saler/owner',
    name: 'owner',
    component: () => import(/* webpackChunkName:'owner' */'@/components/owner')
  },
  {
    path: '/real_estate/saler/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName:'customer' */'@/components/customer')
  },
  {
    path: '/real_estate/saler/code',
    name: 'code',
    component: () => import(/* webpackChunkName:'code' */'@/components/code')
  },
  {
    path: '/real_estate/saler/visit',
    name: 'visit',
    component: () => import(/* webpackChunkName:'visit' */'@/components/visit')
  },
  {
    path: '/real_estate/saler/call',
    name: 'call',
    component: () => import(/* webpackChunkName:'call' */'@/components/call')
  },
  {
    path: '/real_estate/saler/message',
    name: 'message',
    component: () => import(/* webpackChunkName:'message' */'@/components/message')
  },
  {
    path: '/real_estate/saler/message/channel',
    name: 'channel',
    component: () => import(/* webpackChunkName:'channel' */'@/components/message/channel')
  },
  {
    path: '/real_estate/saler/message/media',
    name: 'media',
    component: () => import(/* webpackChunkName:'media' */'@/components/message/media')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/components/home')
  }
]

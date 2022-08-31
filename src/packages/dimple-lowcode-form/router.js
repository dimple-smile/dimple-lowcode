export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./demo/App.vue'),
  },
  {
    path: '/custom',
    name: 'custom',
    component: () => import('./demo/Custom.vue'),
  },
]

export default [
  {
    path: '/User',
    layout: false,
    routes: [
      { path: '/User', routes: [{ name: '登录', path: '/User/login', component: './Login' }] },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'table',
    routes: [
      {
        path: '/system/User',
        name: '用户管理',
        component: './system/User',
      },
      {
        component: '404',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];

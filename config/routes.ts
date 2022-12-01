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
        path: '/system/user',
        name: '用户管理',
        component: './system/User',
      },
      {
        path: '/system/role',
        hideInMenu: true,
        name: '角色管理',
        component: './system/Role',
      },
      {
        path: '/system/menu',
        hideInMenu: true,
        name: '菜单管理',
        component: './system/Menu',
      },
      {
        path: '/system/dept',
        name: '部门管理',
        component: './system/Dept',
      },
      {
        path: '/system/post',
        name: '岗位管理',
        component: './system/Post',
      },
      {
        path: '/system/dict',
        name: '字典管理',
        component: './system/Dict',
      },
      {
        path: '/system/dict-data',
        name: '字典数据',
        hideInMenu: true,
        component: './system/Dict/dictData',
      },
      {
        path: '/system/config',
        name: '参数设置',
        component: './system/Config',
      },
      {
        path: '/system/notice',
        name: '通知公告',
        component: './system/Notice',
      },
      {
        path: '/system/log/',
        name: '日志管理',
        routes: [
          { path: 'operlog', name: '操作日志', component: './monitor/Operlog' },
          { path: 'logininfor', name: '登录日志', component: './monitor/Logininfor' },
          { component: '404' },
        ],
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/monitor',
    name: '系统监控',
    icon: 'table',
    routes: [
      {
        path: '/monitor/online',
        name: '在线用户',
        component: './monitor/online',
      },
      {
        hideInMenu: true,
        path: '/monitor/job',
        name: '定时任务',
        component: './system/User',
      },
      {
        hideInMenu: true,
        path: '/monitor/druid',
        name: '数据监控',
        component: './system/User',
      },
      {
        hideInMenu: true,
        path: '/monitor/server',
        name: '服务监控',
        component: './system/User',
      },
      {
        hideInMenu: true,
        path: '/monitor/cache',
        name: '缓存监控',
        component: './system/User',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/comp',
    name: '组件示例',
    icon: 'table',
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];

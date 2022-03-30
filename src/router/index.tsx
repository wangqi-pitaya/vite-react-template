import Layout from '../layout';

export * from './routerGuard';

/**
 * 只对component属性配置的组件处理为懒加载，不想用懒加载的就用element属性配置组件
 */
export const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import('../pages/Index'),
  },
  {
    path: '/entry',
    title: '组件',
    element: <Layout />,
    children: [
      {
        path: '/entry',
        redirect: '/entry/home',
      },
      {
        path: '/entry/home',
        title: '首页',
        component: () => import('../pages/Home'),
        meta: {
          title:'Home',
        }
      },
      {
        path: '/entry/list',
        title: '列表',
        component: () => import('../pages/List'),
      },
      {
        path: '/entry/detail',
        title: '详情',
        component: () => import('../pages/Detail'),
      },
    ]
  },
  {
    path: '/doc',
    title: '文档',
    element: <Layout />,
  },
  {
    path: '*',
    component: () => import('../pages/404'),
  }
];

export function onRouteBefore({ pathname, meta }: any) {
  if (meta.title !== undefined) {
    document.title = meta.title;
  }
  if (meta.needLogin) {
    return '/login'
  }
}
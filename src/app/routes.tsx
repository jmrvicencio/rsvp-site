import { createHashRouter, Outlet } from 'react-router-dom';

const router = createHashRouter([
  {
    index: true,
    lazy: async () => {
      let Home = await import('@/app/App');
      return { Component: Home.default };
    },
  },
  {
    path: ':id',
    lazy: async () => {
      let Home = await import('@/app/App');
      return { Component: Home.default };
    },
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'login',
        lazy: async () => {
          let Login = await import('@/app/routes/Login');
          return { Component: Login.default };
        },
      },
      {
        lazy: async () => {
          let DashboardWrapper = await import('@/app/routes/DashboardWrappeer');
          return { Component: DashboardWrapper.default };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              let Dashboard = await import('@/app/routes/Dashboard');
              return { Component: Dashboard.default };
            },
          },
        ],
      },
    ],
  },
]);

export default router;

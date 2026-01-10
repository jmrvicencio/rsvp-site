import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    index: true,
    lazy: async () => {
      let Home = await import('@/app/App');
      return { Component: Home.default };
    },
  },
]);

export default router;

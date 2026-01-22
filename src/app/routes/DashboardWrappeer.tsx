import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Provider } from 'jotai';
import { dashboardStore } from '@/features/dashboard/store/store';

function DashboardWrapper() {
  return (
    <ProtectedRoute>
      <Provider store={dashboardStore}>
        <Outlet />
      </Provider>
    </ProtectedRoute>
  );
}

export default DashboardWrapper;

import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

function DashboardWrapper() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export default DashboardWrapper;

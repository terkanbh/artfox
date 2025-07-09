import { useEffect }            from 'react';
import { Outlet, useNavigate }  from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth.jsx';
import AdminNavbar from '~/shared/admin-navbar/AdminNavbar.jsx';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated])

  if (!isAuthenticated) return null;

  return (<>
    <AdminNavbar />
    <Outlet />
  </>);
}
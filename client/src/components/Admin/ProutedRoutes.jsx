import { Outlet, useNavigate } from 'react-router-dom';
import { UseAppContext } from '../../context/appContext';
import { useEffect } from 'react';

const ProutedRoutes = () => {
  const { isAuthenticated } = UseAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/auth', { replace: true });
    }
  }, [isAuthenticated,navigate]);

  return <Outlet />;
};

export default ProutedRoutes;

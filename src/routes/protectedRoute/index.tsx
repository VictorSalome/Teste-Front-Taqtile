import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProtectedRouteProps } from '../../interfaces/interface-router';

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/redirect');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DetailsUserPage, LoginPage, NotFoundPage, RedirectPage, UserAddPage, UserListPage } from '../pages';
import { ProtectedRoute } from './protectedRoute';

export const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/redirect' element={<RedirectPage />} />
        <Route
          path='/user-list-page'
          element={
            <ProtectedRoute>
              <UserListPage />
            </ProtectedRoute>
          }
        />
        f
        <Route
          path='/user-add-page'
          element={
            <ProtectedRoute>
              <UserAddPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/details-user-page/:id'
          element={
            <ProtectedRoute>
              <DetailsUserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

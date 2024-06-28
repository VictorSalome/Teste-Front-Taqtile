import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';

import { UserAddPage } from '../pages/user-add-page';
import { UserListPage } from '../pages/user-list-page';

export const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='*' element={<LoginPage />} />
        <Route path='/user-list-page' element={<UserListPage />} />
        <Route path='/user-add-page' element={<UserAddPage />} />
      </Routes>
    </>
  );
};

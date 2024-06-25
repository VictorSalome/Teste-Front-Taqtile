import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';
import { UserListPage } from '../pages/user-list-page';
import { UserAddPage } from '../pages/user-add-page';
import { DetailsUserPage } from '../pages/details-user-page';

export const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='*' element={<LoginPage />} />
        <Route path='/user-list-page' element={<UserListPage />} />
        <Route path='/user-add-page' element={<UserAddPage />} />
        <Route path='/details-user-page/:id' element={<DetailsUserPage />} />
      </Routes>
    </>
  );
};

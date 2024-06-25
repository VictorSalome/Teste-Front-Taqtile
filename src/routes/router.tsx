import { Route, Routes } from 'react-router-dom';
import { DetailsUserPage, LoginPage, UserAddPage, UserListPage } from '../pages';

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

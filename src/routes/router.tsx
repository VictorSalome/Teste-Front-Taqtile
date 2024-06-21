import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';

export const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
};

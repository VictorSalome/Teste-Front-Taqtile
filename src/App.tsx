import './App.css';

import { AppRouter } from './routes/router';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

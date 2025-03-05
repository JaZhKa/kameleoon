import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/loader';
import './index.css';

const Dashboard = lazy(() => import('./components/dashboard'));
const ResultsPage = lazy(() => import('./components/resultsPage'));
const FinalizePage = lazy(() => import('./components/finalizePage'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/results' element={<ResultsPage />} />
          <Route path='/finalize' element={<FinalizePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

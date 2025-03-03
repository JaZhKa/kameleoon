import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import ResultsPage from './components/resultsPage';
import FinalizePage from './components/finalizePage';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/results' element={<ResultsPage />} />
        <Route path='/finalize' element={<FinalizePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

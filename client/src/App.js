import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Protected from './components/Protected';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import AddStock from './pages/AddStock';
import Bills from './pages/Bills';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route element={<Protected />}>
        <Route exact path="/dashboard" element={<Dashboard />}>
          <Route exact path="stocks" element={<Stocks />} />
          <Route exact path="createstock" element={<AddStock />} />
          <Route exact path="bills" element={<Bills />} />
          <Route exct path={'*'} element={<Navigate to="/404" />} />
        </Route>
      </Route>
      <Route path={'404'} element={<NotFound />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
};

export default App;

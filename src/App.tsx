import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import AddUser from './components/Add';
import UpdateUser from './components/Update';
import Notfound from './components/Notfound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/update/:id' element={<UpdateUser/>} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
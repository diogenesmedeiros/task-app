import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from "@vercel/analytics/react"

import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Analytics/>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/policy' element={<PrivacyPolicy />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
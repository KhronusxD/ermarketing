import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLanding } from './components/MainLanding';
import QuizFlow from './components/Quiz/QuizFlow';
import { RestaurantLanding } from './components/Restaurant/RestaurantLanding';
import RestaurantQuizFlow from './components/Restaurant/RestaurantQuizFlow';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/auditoria-de-lucro-invisivel" element={<QuizFlow />} />
        <Route path="/restaurante" element={<RestaurantLanding />} />
        <Route path="/auditoria-restaurante" element={<RestaurantQuizFlow />} />
      </Routes>
    </Router>
  );
};

export default App;
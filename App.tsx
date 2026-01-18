import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLanding } from './components/MainLanding';
import QuizFlow from './components/Quiz/QuizFlow';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/auditoria-de-lucro-invisivel" element={<QuizFlow />} />
      </Routes>
    </Router>
  );
};

export default App;
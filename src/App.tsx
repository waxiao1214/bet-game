import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Route, Routes as Switch } from 'react-router-dom';
import { Main } from './pages/main';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/*' Component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

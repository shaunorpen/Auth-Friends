import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Login from './components/Login';
import Friends from './components/Friends';
import withAuthCheck from './helpers/withAuthCheck';

export default function App() {
  return (
    <div className="App">
      <h1>Friends App</h1>
      <Route path='/' component={NavBar} />
      <Route path='/' exact component={Login} />
      <Route path='/friends' render={() => withAuthCheck(Friends)} />
    </div>
  );
}

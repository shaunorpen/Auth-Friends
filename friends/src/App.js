import React from 'react';
import { Link, Route } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li><Link to='/'>
        Login
      </Link></li>
      <li><Link to='/friends'>
        Friend List
      </Link></li>
    </ul>
  )
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <label htmlFor='username'>Username: </label>
      <input name='username' />
      <label htmlFor='password'>Password: </label>
      <input name='password' />
      <button>Submit</button> 
    </div>
  );
}

function Friends() {
  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        <Friend />
      </ul>
    </div>
  );
}

function Friend() {
  return (
    <li>
      Friend
    </li>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Friends App</h1>
      <Route path='/' component={NavBar} />
      <Route path='/' exact component={Login} />
      <Route path='/friends' component={Friends} />
    </div>
  );
}

export default App;

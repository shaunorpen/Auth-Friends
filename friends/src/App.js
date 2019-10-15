import React from 'react';
import { Link, Route } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li><Link to='/'>
        Login
      </Link></li>
      <li><Link to='/friends'>
        Friends List
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
      <Friend />
    </div>
  );
}

function Friend() {
  return (
    <div>
      Friend
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar />
      <Login />
      <Friends />
    </div>
  );
}

export default App;

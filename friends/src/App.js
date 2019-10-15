import React, { useState } from 'react';
import axios from 'axios';
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
  const initialUserDetails = { username: '', password: '', };
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  
  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  } 

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', userDetails)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
      })
      .catch(err => {
        alert(err.response.data.error);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <label htmlFor='username'>Username: </label>
      <input name='username' type='text' value={userDetails.username} onChange={handleChange} />
      <label htmlFor='password'>Password: </label>
      <input name='password' type='password' value={userDetails.password} onChange={handleChange} />
      <button onClick={handleSubmit} >Submit</button> 
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

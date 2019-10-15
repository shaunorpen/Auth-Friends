import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

function NavBar(props) {
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = e => {
    localStorage.clear();
    props.history.push('/');
  }

  return (
    <ul>
      <li><Link to='/' onClick={handleLogout} >
        {isLoggedIn ? 'Logout' : 'Login'}
      </Link></li>
      <li><Link to='/friends'>
        Friend List
      </Link></li>
    </ul>
  )
}

function Login(props) {
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
        props.history.push('/friends');
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

function axiosWithAuth() {
  const token = localStorage.getItem('token');
  const instance = axios.create({
    headers: {
      Authorization: token,
    },
  });
  return instance;
}

function Friends() {
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    axiosWithAuth().get('http://localhost:5000/api/friends')
    .then(res => {
      setFriendList(res.data);
    })
    .catch(err => {
      alert(err.response.data.error);
    });
  }, []);
  return (
    <div>
      <h2>Friend List</h2>
      <ul>
        {friendList.map(friend => <Friend friend={friend} />)}
      </ul>
    </div>
  );
}

function Friend({ friend: { name, age, email } }) {
  return (
    <li>
      {name} is {age} years old and contactable at {email}.
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

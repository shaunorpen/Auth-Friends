import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';

function NavBar(props) {
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = e => {
    localStorage.clear();
    props.history.push('/');
  }

  return (
    <div>
      <h2>Navigation</h2>
      <ul>
        <li><Link to='/' onClick={handleLogout} >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Link></li>
        <li><Link to='/friends'>
          Friend List
        </Link></li>
      </ul>
    </div>
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
        {friendList.map(friend => <Friend friend={friend} setFriendList={setFriendList} />)}
      </ul>
      <AddFriend setFriendList={setFriendList} />
    </div>
  );
}

function Friend({ friend: { id, name, age, email }, setFriendList }) {
  const handleDelete = (id) => e => {
    debugger
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        setFriendList(res.data);
      })
      .catch(err => {
        alert(err.response.data.message);
      })
  }
  return (
    <li>
      {name} is {age} years old and contactable at {email}.
      <button>Update Friend</button>
      <button onClick={handleDelete(id)} >Delete Friend</button>
    </li>
  );
}

function AddFriend({ setFriendList }) {
  const initialFormValues = {
    name: '',
    age: '',
    email: '',
  }
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  const handleAddFriend = e => {
    axiosWithAuth().post('http://localhost:5000/api/friends', formValues)
      .then(res => {
        setFriendList(res.data);
        setFormValues(initialFormValues);
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  }

  return (
    <div>
      <h2>Add Friend</h2>
      <label htmlFor='name'>Name: </label>
      <input type='text' name='name' value={formValues.name} onChange={handleChange} />
      <label htmlFor='age'>Age: </label>
      <input type='number' name='age' value={formValues.age} onChange={handleChange} />
      <label htmlFor='email'>Email: </label>
      <input type='email' name='email' value={formValues.email} onChange={handleChange} />
      <button onClick={handleAddFriend} >Add Friend</button>
    </div>
  );
}

function withAuthCheck(Component) {
  if (localStorage.getItem('token')) {
    return <Component />;
  }
  return <Redirect to='/' />;
}

function App() {
  return (
    <div className="App">
      <h1>Friends App</h1>
      <Route path='/' component={NavBar} />
      <Route path='/' exact component={Login} />
      <Route path='/friends' render={() => withAuthCheck(Friends)} />
    </div>
  );
}

export default App;

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
  const initialFormValues = {
    name: '',
    age: '',
    email: '',
  }
  const [formValues, setFormValues] = useState(initialFormValues);
  
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
        {friendList.map(friend => <Friend friend={friend} 
                                          setFriendList={setFriendList}
                                          setFormValues={setFormValues}
                                          key={friend.id} />)}
      </ul>
      <AddOrUpdateFriend 
        setFriendList={setFriendList}
        formValues={formValues}
        setFormValues={setFormValues}
        initialFormValues={initialFormValues} />
    </div>
  );
}

function Friend({ friend: { id, name, age, email }, setFriendList, setFormValues }) {
  const handleDelete = id => e => {
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        setFriendList(res.data);
      })
      .catch(err => {
        alert(err.response.data.message);
      })
  }

  const handleUpdate = (id, name, age, email) => e => {
    setFormValues({
      id,
      name,
      age,
      email,
    })
  }

  return (
    <li>
      {name} is {age} years old and contactable at {email}.
      <button onClick={handleUpdate(id, name, age, email)} >Update Friend</button>
      <button onClick={handleDelete(id)} >Delete Friend</button>
    </li>
  );
}

function AddOrUpdateFriend({ setFriendList, formValues, setFormValues, initialFormValues }) {
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  const handleAddOrUpdateFriend = e => {
    if (formValues.id) {
      axiosWithAuth().put(`http://localhost:5000/api/friends/${formValues.id}`, {
        name: formValues.name,
        age: formValues.age,
        email: formValues.email,
      })
        .then(res => {
          setFriendList(res.data);
          setFormValues(initialFormValues);
        })
        .catch(err => {
          alert(err.response.data.message);
        })
    } else {
      axiosWithAuth().post('http://localhost:5000/api/friends', formValues)
        .then(res => {
          setFriendList(res.data);
          setFormValues(initialFormValues);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  }

  return (
    <div>
      <h2>{formValues.id ? 'Update' : 'Add'} Friend</h2>
      <label htmlFor='name'>Name: </label>
      <input type='text' name='name' value={formValues.name} onChange={handleChange} />
      <label htmlFor='age'>Age: </label>
      <input type='number' name='age' value={formValues.age} onChange={handleChange} />
      <label htmlFor='email'>Email: </label>
      <input type='email' name='email' value={formValues.email} onChange={handleChange} />
      <button onClick={handleAddOrUpdateFriend} >{formValues.id ? 'Update' : 'Add'} Friend</button>
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

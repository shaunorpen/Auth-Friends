import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
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
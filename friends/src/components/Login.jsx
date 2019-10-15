import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../state/redux';
import axios from 'axios';

export default function Login(props) {
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    const handleChange = e => {
        dispatch(setUserDetails({
        ...userDetails,
        [e.target.name]: e.target.value,
        }));
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
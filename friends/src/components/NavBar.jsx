import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
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
    );
}
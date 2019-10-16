import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuthCheck(Component) {
    if (localStorage.getItem('token')) {
      return <Component />;
    }
    return <Redirect to='/' />;
}
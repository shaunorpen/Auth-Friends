import React from 'react';
import { useDispatch } from 'react-redux';
import { setFriendsList, setFormValues } from '../state/redux';
import axiosWithAuth from '../helpers/axiosWithAuth';

export default function Friend({ friend: { id, name, age, email } }) {
    const dispatch = useDispatch();

    const handleDelete = id => e => {
        axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
        .then(res => {
            dispatch(setFriendsList(res.data));
        })
        .catch(err => {
            alert(err.response.data.message);
        })
    }

    const handleUpdate = formValues => e => {
        dispatch(setFormValues(formValues));
    }

    return (
        <li>
        {name} is {age} years old and contactable at {email}.
        <button onClick={handleUpdate({id, name, age, email})} >Update Friend</button>
        <button onClick={handleDelete(id)} >Delete Friend</button>
        </li>
    );
}
import React from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';

export default function Friend({ friend: { id, name, age, email }, setFriendList, setFormValues }) {
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
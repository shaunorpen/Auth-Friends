import React from 'react';
import { useDispatch } from 'react-redux';
import { setFormValues, deleteFriend } from '../state/redux';

export default function Friend({ friend: { id, name, age, email } }) {
    const dispatch = useDispatch();

    const handleDelete = id => e => {
        dispatch(deleteFriend(id));
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
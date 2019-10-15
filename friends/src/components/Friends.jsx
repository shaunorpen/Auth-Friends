import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFriendsList } from '../state/redux';
import Friend from './Friend';
import AddOrUpdateFriend from './AddOrUpdateFriend';
import axiosWithAuth from '../helpers/axiosWithAuth';

export default function Friends() {
    const friendList = useSelector(state => state.friendList);
    const dispatch = useDispatch();

    const initialFormValues = {
        name: '',
        age: '',
        email: '',
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        axiosWithAuth().get('http://localhost:5000/api/friends')
            .then(res => {
                dispatch(setFriendsList(res.data));
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
                                            setFormValues={setFormValues}
                                            key={friend.id} />)}
        </ul>
        <AddOrUpdateFriend 
            formValues={formValues}
            setFormValues={setFormValues}
            initialFormValues={initialFormValues} />
        </div>
    );
}